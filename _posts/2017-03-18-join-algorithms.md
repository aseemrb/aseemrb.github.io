---
layout: mathpost
title: Common join algorithms
category: programming / implementation
---

Working in the [Azure Disaster Recovery (ASR)](https://docs.microsoft.com/en-us/azure/site-recovery/) team for over 6 months now, I have been using [Kusto](https://docs.microsoft.com/en-us/connectors/kusto/) (a log analytics platform developed at Microsoft) extensively for interactive analysis and monitoring of internal service components and flows.

Kusto is modeled in **a typical RDBMS fashion** and it supports complex analytical queries over stored entities. The **ingestion and querying** performance is topnotch, which comes at the cost of **sacrificing** the ability to carry out in-place updates of individual rows. In the Kusto documentation the best practices have mentioned that when doing joins (synonymous to joins in SQL terminology), always keep the computationally heavy part on the right side of the join for better performance. I used to wonder why this is recommended until I read about the most common join algorithms. Perhaps reading about how joins are implemented will help me write more efficient queries? This is a post about some very primitive join algorithms.

---

## Notation
- $$N_x$$: Number of records in relation X
- $$B_x$$: A block (partition) in relation X
- $$P_x$$: The number of blocks (partitions) of X
- $$N_{B_x}$$: Number of records in a block of relation X

---

## Nested loop algorithm
This is the trivial join algorithm with two nested loops. A brute force on all row-row combinations of both sides. For joining two relations **X** and **Y**, it runs in **$$\mathcal{O}(N_xN_y)$$** operations.

The following would be a crude pseudocode for this.

{% highlight python %}
for (record Rx in X)
{
    for (record Ry in Y)
    {
        # Check if Rx and Ry satisfy the join condition.
        if join_condition.satisfy(Rx, Ry)
        {
            # Join the records and add to output
            return (Rx, Ry)
        }
    }
}
{% endhighlight %}

---

## Hash join algorithm
In this algorithm one of the tables is **loaded into memory and hashed on the joining key**. Then while scanning the second table, the hashes are matched to verify the join condition. To judge if this is a better algorithm we need to consider all pros and cons of the algorithm. First let us look at the pseudocode. In the example below, an inner join is performed. The primary thing to consider is that the hash function has the **join attributes as keys** and the **entire row as the value**.

{% highlight python %}
HashTable Ht;
for (record Rx in X)
{
    Compute hash key on join attribute(s) in Rx
    Insert Rx to the appropriate bucket in Ht
}

for (record Ry in Y)
{
    Compute hash key on join attribute(s) in Ry
    Lookup this key in Ht and find the joining bucket
    for (record Rx in the selected bucket)
    {
        # Depending on the values, actual implementations
        # might add a check here to prevent errors due to
        # collisions.
        return (Rx, Ry)
    }
}

{% endhighlight %}

This algorithm hence consists of two "phases"
1. **Build phase** - where we build the hash table from relation X
2. **Probe phase** - where we scan (probe) the relation Y to match hashes

The build phase runs in $$\mathcal{O}(N_x)$$ and the probe phase runs in $$\mathcal{O}(N_y)$$ because hash table lookup is $$\mathcal{O}(1)$$.<br>
**Overall complexity: $$\mathcal{O}(N_a + N_b)$$** which is linear and much better than the quadratic nested loop.

**As you might have guessed, two limitations immediately pop up when considering the hash join**
1. What if during the build phase, the relation (table) **does not fit into available memory**?
2. What about **non-equality conditions**? Comparing hashes would work only for equi-joins and not for any generic join conditions.

### Dealing with the limitations
- #### Memory constraint
    If the whole relation does not fit into memory, then one way is to **partition the relation into blocks** of size that fit in memory, **hash each block** and then **probe** the other relation for each block of the first relation.

    For joining X and Y, if we partition X into $$P_x$$ blocks then the time taken for each block $$B_x$$ to be joined with relation Y is $$\mathcal{O}(N_{B_x} + N_y)$$, similar to the classical hash-join above. Overall for all blocks this will take $$\mathcal{O}(N_x + P_xN_y)$$ which is still better than the nested loop.

- #### Equi-join constraint
    We cannot use hash join with a non-equality condition (because hashing). This remains a limitation of the algorithm.

---

## Sort-merge algorithm
The hash-join does not work for conditions other than equality, that's where sort-merge algorithm hops in. This is the most commonly used algorithm in most RDBMS implementations. The special idea here is to first sort both the relations (tables) by the join attribute so that a linear scan with two probes (one for each relation) will be able to deal with both relations at the same time. Therefore, practically the costliest part of this algorithm is sorting the inputs. Sorting can be done in 2 ways

- Explicit external sort.
- Exploit a pre-existing ordering in the join relations. For instance if the join input is produced by an index scan* then we already have that relation ordered.

Therefore, for two relations X and Y, if X fits in $$P_x$$ memory pages and Y fits in $$P_y$$ memory pages, then the worst case running time would be $$\mathcal{O}(P_x + P_y + P_xlog(P_x) + P_ylog(P_y))$$.

There are numerous other join algorithms that leverage the ideas in the above mentioned basic algorithms, for instance the hybrid hash-join partitions each relation using a hash function for saving probe time on the second relation when performing the actual join. **_Knowing how joins are implemented in the DBMS being used, one might therefore write more efficient queries_**.

_* Recommended reading: B+ tree, Bx tree_
