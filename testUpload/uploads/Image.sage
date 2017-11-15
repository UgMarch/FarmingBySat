from matplotlib import image, numpy, pyplot
from IPython.display import Image as pyImage, display

class Image:
    
    def __init__(self, data):
        
        self.data = numpy.array(numpy.array(data)[:,:,0:3]).astype('uint8')
    
    def __repr__(self):
        
        self.show()
        return str(self.size()) + " Image"
        
    def __add__(self, other):
        
        return Image(numpy.bitwise_xor(self.data, other.data) )
        
    def size(self):
        
        return (len(self.data), len(self.data[0]))
        
    def show(self):
    
		#show(pyplot.imshow(self.data))
        
        #image.imsave(".temp.png", self.data)
        #salvus.file(".temp.png")
    
        image.imsave(".temp.png", self.data)
        display(pyImage(".temp.png"))
   
def RandomImage(m, n):
    
    return Image(numpy.random.randint(256, size=(m,n,3)) )
    
def LoadImage(filename):
    
    tmp = image.imread(filename)
    return Image(image.imread(filename))
