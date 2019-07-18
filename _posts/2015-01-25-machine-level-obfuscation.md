---
layout: post
title: Machine level obfuscation
---

Let’s start with this beautiful piece of code in C. What do you think it does?

{% highlight c %}
#include <stdio.h>
double d[]= {1156563417652693958656.0, 272};
int main()
{
    d[1]--?d[0]*=2, main() : printf("%s\n",(char*)d);
    return 0;
}
{% endhighlight %}

Go ahead and run it on your machine! For lazy bums, here is the place you can see the output: [http://ideone.com/UaGZDp](http://ideone.com/UaGZDp)

Well, the output of this code depends on the machine, more specifically the [endianness](http://en.wikipedia.org/wiki/Endianness) of the machine. Let us walk through the code step by step to understand all this.

#### Line 2
{% highlight c %}
double d[]= {1156563417652693958656.0, 272};
{% endhighlight %}

Here we have simply declared a one-dimensional double array and initialized it with two elements with some values. The numbers are specific, which we shall see later in this post.

#### Line 5:
This line is a fancy way of saying
{% highlight c %}
if(d[1] > 0)
{
    d[1] = d[1] - 1;
    d[0] = 2 * d[0];
    main();
}
else
    printf("%s\n",(char*)d);
{% endhighlight %}

Ternary operators are used here instead of an if-else block to condense the code. The main function is called repeatedly until `d[1]` becomes 0. Then we typecast the `double` array to a `char` pointer and print its value as a string using the `"%s"` placeholder in the `printf` function.

So when does `d[1]` become 0? You got it right, it’s after doubling `d[0]` 272 times. Now when `d[1]` becomes 0, **`d[0] = 8.77663973968813359063877158122E102`** in the *__mantissa exponent__* notation. This 64 bit double number in binary is represented as:
**01010101 01001111 01011001 01000101 01010110 01001111 01001100 01001001**

These are the 8 bytes (64 bits) representing the number. Here the first bit 0 denotes the sign (+ve) of the number. The next 11 bits **10101010100** represent the **exponent**, and the last 52 bits **1111 0101 1001 0100 0101 0101 0110 0100 1111 0100 1100 0100 1001** represent the **mantissa**.

This is an 8-byte representation (64 bits) in the IEEE754 standard and so a char pointer will read the whole thing one byte at a time, as char is 1-byte in size in the C language implementation. Now comes the role of endianness. On little endian machines, the string will be read backwards, i.e. the last byte is read first, so the bytes read in order are (binary, hex, decimal, char ascii):

- `01001001 = 0x49 = 73 = I`
- `01001100 = 0x4C = 76 = L`
- `01001111 = 0x4F = 79 = O`
- `01010110 = 0x56 = 86 = V`
- `01000101 = 0x45 = 69 = E`
- `01011001 = 0x59 = 89 = Y`
- `01001111 = 0x4F = 79 = O`
- `01010101 = 0x55 = 85 = U`

As `d[]` is an array, the next byte after `d[0]` in memory stores `d[1]` which is now `= 0`; so this acts as a `NULL` character, a string terminator for the `%s` placeholder in `printf`. Hence, the output of the code above is `ILOVEYOU`.

Interesting, isn’t it? You just found a geeky way to say this to the love of your life! Anyway, this interesting aspect can be used to obfuscate any string into numbers, as I did with my name. `ASEEMRAJ` can be obfuscated with `d[0] = 4875566432211777.0` and `d[1] = 113`. Now go and find the magical numbers for your own strings.

*Note: If a `float` is used instead of double we have 4 bytes, hence 4 characters instead of 8.*

---
