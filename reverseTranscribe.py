import sys

# RNA to DNA
def reverseTranscribe(rnaSeq):
	return rnaSeq.replace('U', 'T')

with open(sys.argv[1]) as fh:
	rna = fh.next().strip()

dna = reverseTranscribe(rna)
print dna
