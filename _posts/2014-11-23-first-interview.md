---
layout: post
title: First interview experience
category: Experiences
---

On 14th November 2014, Microsoft invited the selected few (including me) at IIIT Delhi, for final interviews for a software developer internship position, and I would like to share the story briefly.

This was going to be the first face to face interview of my life, so I was pretty excited. The process started with a total of 60 candidates from different institutes of North India. We had a written round first. We were given a problem dealing with linked lists, and assigned one invigilator per 5 candidates to discuss doubts and solutions with them. 7 candidates remained by the time we reached the last round.

---

## Round 1 (written)
Problem: Given a linked list with node structure as
{% highlight c %}
struct Node
{
    int data;
    Node* next;
    Node* random;
};
{% endhighlight %}

where the random pointer may point to any node in the linked list, including the same node to which the random pointer belongs, or it may be even Null, duplicate the linked list and return the head pointer to the new linked list.

(Perhaps this is a very well known problem, but I had no experience with this, so was thinking afresh) I made the mistake of assuming that we are not allowed to alter the original linked list given in input, which led me to write an inefficient solution – `O(n^2)`, for which I had to give another written round.

This problem can be easily solved in `O(n)` if altering original list is allowed in the following way:

- Create new nodes and insert them after the corresponding node in old list, e.g.<br />
**`A`–>`B`–>`C`–>`D`–>`E`–>`NULL`** is transformed to <br />
**`A`–>`A'`–>`B`–>`B'`–>`C`–>`C'`–>`D`–>`D'`–>`E`–>`E'`–>`NULL`**<br />
where **`A'`**, **`B'`**, … **`E'`** are newly created nodes
- Iterate in jumps of two, starting from A and assign:<br />
**`ptr`->`next`->`random` = `ptr`->`random`->`next`;**
- Reconnect next pointers in the new list **`A'`->`B'`->…`E'`->`NULL`** and return pointer to **`A'`**

---

## Round 2 (written)
Problem: Given a binary tree, print the outer view of the tree in clockwise order starting from root.

I solved this in two steps, first printing the right view (modified to print leaves so that bottom view is also covered) and then printing the left view from bottom to top. The invigilator suggested breadth first traversal with a marker to store first and last nodes of a level separately and then print them as needed, but I convinced him that this method would work only for full binary trees and not all general binary trees, whereas my method would work for all binary trees. I was pushed on to the interviews then.

---

## Round 3 (interview 1)

M: Me, I: Interviewer

| I: | What did you do at Microsoft Hackcon? (a hacking competition where our team ranked 15 nationally)
| M: | (Explained the competition and how we survived it)
| I: | Tell me about yourself briefly, apart from your programming skills, as I can see you have a strong skill set in your CV.
| M: | I find interest in Mathematics and Physics, write poetry and play music as hobbies. Also, I like roller-skating.
| I: | Nice, so you were awarded first position in Data Structures and Algorithms! What is your favorite data structure?
| M: | (Don't know why) Graphs, because of the beautiful applications in real life problems.

Then he asked me some problems which I solved using Kruskal's, Dijkstra's and Johnson's algorithm. (I had to write working code for all of them.)

| I: | Okay so this is your last problem for this round. Given an integer n, write an API to find the next integer which is a palindrome.
| M: | (Wrote the function, named it 'api')
| I: | Good job, I'm pushing you on to the next round and I want you to take care of two things.
| M: | Sure!
| I: | First, always try to think of test cases when you write code to solve a problem. Second, don't use stupid function names! (referring to the function name 'api' that I used)
| M: | I will definitely take care of that. Thank you.
| I: | Do you have any questions for me?
| M: | (asked about the internship work which he explained briefly).

---

## Round 4 (interview 2)

M: Me, I1: Interviewer 1, I2: Interviewer 2
(I was the last candidate to be interviewed)

| I1: | So you waited so long! (Being the last one to be interviewed). Are you hungry? We have three sandwiches here if you want.
| M: | No thank you, I'm good.
| I1: | (Picking up two sandwiches) Choose one, brown bread or white bread? I know you must be running on reserve by now.
| M: | …. (unresponsive)
| I1: | Don't worry, this is not an interview question! You just have an offer to eat a sandwich.
| I2: | He is just shy, actually he wants both of them plus the third one on the table.
| M: | Thank you, I'll have both.
| I1: | Good! Now while you eat, maybe you can think about this problem. (Gets up, picks up a marker and goes to the white board) You have a new deck of playing cards and you want to shuffle it. Think of some ways and then we shall discuss to find the best way. (Handed me the marker).
| M: | (Ate the first sandwich completely, and scribbled something on the board). I could think of many ways, but this seems efficient to me, I'm taking each element one by one (say index i), generating a random number from i+1 to 51 and swapping the elements at the two indices.
| I1: | You are focusing on time complexity here I see. But I would like you to achieve the maximum randomness possible, use extra space too if you want. (That was a big hint to tell what he wanted).
| M: | Then I will generate random numbers and bind them with elements of the array. Then, using the random numbers as keys, I will sort the array.
| I2: | Yes, that is the perfect way to shuffle elements. You should focus on the goal of a problem instead of always thinking about optimizing on time.
| M: | I will remember that.
| I1: | Okay I'll give you another chance. Can you write a function to print factorial of numbers as large as say 5000?
| M: | (Knew the problem) Yes I can! (Wrote the code). Below is the code in C++

{% highlight c %}
cin >> n;
if(n < 0) break;
int a[sz] = {0};
a[0] = 1;
m = 1; // for saving computation
for(int i = 2; i <= n; i++)
{
  j = 0, k = 0;
  while(j < m && j < sz)
  {
    k = i*a[j] + k;
    a[j] = k % 10;
    k /= 10;
    j++;
    if(k > 0 && j >= m) m++;
  }
}
j = sz - 1;
while(a[j] == 0) j--;
cout << endl;
while(j >= 0) cout << a[j--];
cout << "\n";
{% endhighlight %}

| I1: | Correct. I hope we are done with testing you now. Nice meeting you!
| M: | Thank you. Glad meeting you too.
| I1: | Expect to see you at Microsoft then! Bye
| M: | Thank you.
| I2: | Take the third sandwich on your way out, and don’t be shy when you are offered something.
| M: | Sure, thank you!
