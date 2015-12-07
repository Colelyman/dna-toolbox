import sys

# DNA to RNA
def transcribe(dnaSeq):
	return dnaSeq.replace('T', 'U')

with open(sys.argv[1]) as fh:
	dna = fh.next().strip()

rna = transcribe(dna)
print rna
