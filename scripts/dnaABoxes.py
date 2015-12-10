import sys, itertools

def input(path):
	seq = ""
	with open(path) as fh:
		for line in fh:
			if line[0] == '>':
				header = line.strip()
			else:
				seq += line.strip()
	return seq

def skew(seq):
	prefix = 0
	minimum = []
	min_value = 0
	for i in range(len(seq)) :
		if prefix < min_value:
			minimum = []
		 	min_value = prefix
		if prefix == min_value:
		        minimum.append(i)

		if seq[i] == "C":
		        prefix -= 1
		elif seq[i] == "G":
		        prefix += 1
	#for i in minimum:
	    #print i,
	return minimum

def mutations(word, hamming_distance, charset='ATCG'):
    # this enumerates all the positions in word
    for indices in itertools.combinations( range( len( word ) ), hamming_distance ):
        for replacements in itertools.product(charset, repeat=hamming_distance):
            mutation = list(word)
            for index, replacement in zip( indices, replacements ):
                mutation[ index ] = replacement
            yield "".join( mutation )

def mismatches(seq, kmerLength, mismatches):
	counts = {}

	for i in range(len(seq) - kmerLength + 1):
	    kmer = seq[i: i + kmerLength]
	    #print "kmer: ", kmer

	    mutantKmers = set()
	    for mutantKmer in mutations(kmer, mismatches):
	        mutantKmers.add(mutantKmer)
	        #print mutantKmer,

	    for uniqueMutantKmer in mutantKmers:
	        uniqueMutantKmerRevCom = revCom(uniqueMutantKmer)
	        if uniqueMutantKmerRevCom in counts:
	            counts[uniqueMutantKmerRevCom] += 1
	        else:
	            counts[uniqueMutantKmerRevCom] = 1

	        if uniqueMutantKmer in counts:
	            counts[uniqueMutantKmer] += 1
	        else:
	            counts[uniqueMutantKmer] = 1

	maximum = int(0)
	mostFreq = []

	for key, val in counts.iteritems():
	    if counts[key] > maximum:
	        maximum = counts[key]
	        mostFreq = []
	        mostFreq.append(key)
	    elif counts[key] == maximum:
	        mostFreq.append(key)

	#print " ".join(mostFreq)
	return mostFreq

def revCom(seq):
	complement = ""

	for i in seq :
		if i == "A":
			complement = complement + "T"
		elif i == "T":
			complement = complement + "A"
		elif i == "C":
			complement = complement + "G"
		elif i == "G":
			complement = complement + "C"

	complement = complement[::-1]
	return complement

def search(seq, kmer):
	for i in range(len(seq)):
		if kmer == seq[i:i+len(kmer)]:
#			print kmer
			return kmer

seq = input( sys.argv[1] )
minimum = skew( seq )

start = int( minimum[0] )#sys.argv[2] ) # this is the start position that is found using the skew algorithm
window = int ( 500 )#sys.argv[3] ) # default 500

seq_window = seq[ start : start + window]
possibleKmers = mismatches(seq_window, 9, 1) # this returns all possible kmers in the window that could occur
# it does not necessarily mean that these kmers occur in the genome

realKmers = set()

for i in possibleKmers:
	realKmers.add( search( seq_window, i ) )
	realKmers.add( search( revCom(seq_window), i ) )

for i in realKmers:
	print i,
