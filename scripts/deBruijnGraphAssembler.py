import sys, itertools

reads = []
#k = 13
biggest_read = 0
kmer_size_dict = dict()
ideal_k = 0
biggest_contig = 0
best_contigs = []
best_contig = ""
with open( sys.argv[ 1 ] ) as fh:
    for line in fh:
        if line[0] != '>':
            r = line.strip()
            if 'N' not in r:
                reads.append( r )
            if len(r) > biggest_read:
                biggest_read = len(r)

            #print line
#print biggest_read
#loop through and find the best k. start k at 3 or whatever 
#
# 7-66
# biggest 346
# 65
# GGGGTGTGCTGGGGGCGCAGGACCAGGAGGCGTCAGCCGGGGGCTCTGGGTGGATTTAGAAGACATAATCAGGTGTGCGTTGGAGTAGGTGCAGCCTGGAGAGGTGAGGGTGGATTGATGGGTGGAGTTAGGGGAGGGCCTGGTTAGTGGGCGGGGCCATAGGAAAGTGCGGCGGGGGTATTTATTGTGTGGGCGGGGGTAGAGTGCAAGGGCGAAAGAGGAGTGTCCGAAAAAGGAGTCAAGTGGGGTGATAGCTTCGAGAGCAACCTGGGCAACCTAGGGAGACCCCATCTCTATAAAAAATTTAAAAATTAGCTGGACATGGTGGTGTGTGCCTGTGGTCTCA
#
#
for k in range(72, 80): #(3, biggest_read):
    print k
    #breaking up the reads into k sized kmers and adding them to the dict
    for read in reads:
        #print read
        for i in range( len(read)-k+1):
            kmer = read[ i : i + k]
            if kmer in kmer_size_dict:
                kmer_size_dict[kmer] += 1
            else:
                kmer_size_dict[kmer] = 1  

    #making the size dict
    kmer_size_count = dict()
    for key in sorted(kmer_size_dict.iterkeys()):
            val = kmer_size_dict[key]
            #val.sort()
            #print ""
            #print key + "->" + str(val) 
            if val in kmer_size_count:
                kmer_size_count[val] += 1
            else:
                kmer_size_count[val] = 1

    #finding the cutoff value
    cutoff = 1000000000
    desend = True
    for key in sorted(kmer_size_count.iterkeys()):
        val = kmer_size_count[key]
        #print str(key) +"->"+ str(val)
        if val > cutoff:
            desend = False
        if val < cutoff and desend:
            cutoff = val


    #print cutoff
    #making a new dict of kmers that appear at least the cutoff amount
    #*************** PUT THIS BACK IN WHEN WE ARE TESTING INPUT WITH ERRORS *****************
    reduced_kmer_dict = dict()
    reduced_kmer_list = list()
    for key in sorted(kmer_size_dict.iterkeys()):
            val = kmer_size_dict[key]
            #if val >= cutoff:
            reduced_kmer_dict[key] = val
            reduced_kmer_list.append(key)


    for key in sorted(reduced_kmer_dict.iterkeys()):
            val = reduced_kmer_dict[key]
            #print key + "->" + str(val)

    ############ Stanleys part ################
            
    g = dict()
    counts = dict()
    edge_count = 0

    for kmer in reduced_kmer_list:
        #print kmer
        left = kmer[ : -1 ]
        right = kmer[ 1 : ]
        edge_count += 1

        if left in g:
            g[ left ].append( right )
        else:
            g[ left ] = [ right ]
        
        if left in counts:
            counts[ left ][ 1 ] += 1
        else:
            counts[ left ] = [ 0, 1 ]

        if right in counts:
            counts[ right ][ 0 ] += 1
        else:
            counts[ right ] =[ 1, 0 ]

    non_branching = set()
    contigs = []
    #############################################
    def build_graph( start, g ):
        global edge_count
        path = [ start ]
        cur_node = start

        while len( cur_node ) > 0:
            next_node = g[ cur_node ][ 0 ]
            del g[ cur_node ][ 0 ]
            if len( g[ cur_node ] ) == 0:
                del g[ cur_node ]

            edge_count -= 1
           
            #print cur_node
            if next_node in non_branching:
                #print "non branching:", cur_node
                path.append( next_node )
                cur_node = next_node
                continue
            else:
                path.append( next_node )
                break

        return path
    #############################################
    #print g
    #print counts
    #############################################
    def merge_nodes( nodes ):
        contig = nodes[ 0 ]
        for i in range( 1, len( nodes ) ):
            contig += nodes[ i ][ -1 ]
        return contig
    #############################################
    def has_outgoing( node ):
        if len( g[ node ] ) > 0:
            return True
        else:
            return False
    #############################################
    for key, item in counts.iteritems():
        if item[ 0 ] == 1 and item[ 1 ] == 1:
            non_branching.add( key )

    #print non_branching

    start = g.keys()[ 0 ]
    start = 'TG'
    #while( edge_count > 0 ):
    #    print edge_count
    while edge_count > 0:
        for i in g.keys():
            if i in non_branching or len( g[ i ] ) == 0:
                continue
            start = i
            break
        #print "starting with:", start
        c = build_graph( start, g )
        contigs.append( c )

    for contig in contigs:
        c = merge_nodes( contig )
        if len(c) > biggest_contig:
            biggest_contig = len(c)
            ideal_k = k 
            #best_contigs = contigs
            best_contig = merge_nodes( contig )



print biggest_contig
print ideal_k
print best_contig







