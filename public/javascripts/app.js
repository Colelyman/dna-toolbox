var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">

          </div>
        </nav>

        <div className="container">
          {this.props.children || <Home/>}
        </div>
      </div>
    );
  }
});

var Header = React.createClass({
    render: function() {
        return (
          <div className="header">
            <div className="headerwrapper">
              <h1 className="headertitle">DNA Toolbox</h1>
              <p>{this.props.name}</p>
            </div>
          </div>
        );
    }
});


var Home = React.createClass({
  render: function() {
    return (

      <div className="home">
        <Header name="Jillian&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Cole&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Landon&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Nathan"/>
        <h2 className="welcome">Pick a Tool From the Toolbox</h2>
        <div className="boxcontainer">
            <Link to="tool1" onClick={this.handleClick}>
              <div className="infobox">
                <p className="infotitle">dnaA Boxes</p>
                <p className="infodescription">Using this DnaA box tool, you can input one genome sequence and the output will be the likely origin of replication. This tool utilizes the many different methods of locating the minimum skew, finding frequent words with mismatches, finding the reverse compliment, and all occurrences of the DnaA box. Using these different algorithms provides you with a highly likely origin of replication within the input genome.
</p>
              </div>
            </Link>
            <Link to="tool2">
              <div className="infobox">
                <p className="infotitle">Translation</p>
                <p className="infodescription">The Translation tool will take an input of a single RNA sequence and convert it into the corresponding amino acid sequence.
</p>
              </div>
            </Link>
            <Link to="tool3">
              <div className="infobox">
                <p className="infotitle">Transcription</p>
                <p className="infodescription">The Transcription tool will take an input of a single sequence and convert it into the corresponding RNA sequence.
</p>
              </div>
            </Link>
            <Link to="tool4">
              <div className="infobox">
                <p className="infotitle">Reverse Transcription</p>
                <p className="infodescription">This tool will convert the RNA single sequence into the corresponding DNA sequence as an ouput.</p>
              </div>
            </Link>
            <Link to="tool5">
              <div className="infobox">
                <p className="infotitle">Suffix Tree</p>
                <p className="infodescription">This tool will calculate the Suffix Tree from the inputted sequence.
</p>
              </div>
            </Link>
            <Link to="tool6">
              <div className="infobox">
                <p className="infotitle">Suffix Array</p>
                <p className="infodescription">This tool uses the method in the Suffix Tree tool to condense the sequence from a tree into a Suffix Array. The input is the same as the Suffix Tree, simply a sequence.
</p>
              </div>
            </Link>
            <Link to="tool7">
              <div className="infobox">
                <p className="infotitle">Burrows Wheeler Transform</p>
                <p className="infodescription">This Burrows Wheeler Transform tool will take a given sequence and transform the sequence into its corresponding compressed string using the BWT method.
</p>
              </div>
            </Link>
            <Link to="tool8">
              <div className="infobox">
                <p className="infotitle">BWT First Column</p>
                <p className="infodescription">To use this tool, input a single DNA sequence and the first column of the Suffix Array will be outputted.
</p>
              </div>
            </Link>
            <Link to="tool9">
              <div className="infobox">
                <p className="infotitle">First To Last</p>
                <p className="infodescription">To use this tool, you must input a single DNA sequence and the given result will be a First to Last string of the sequence.
</p>
              </div>
            </Link>
            <Link to="tool10">
              <div className="infobox">
                <p className="infotitle">DeBruijn Graph Assembly</p>
                <p className="infodescription">This DeBruijn graph assembler with accept a fasta file with a list of reads as input and then output the longest contig after having constructed a DeBruijn graph from the reads provided. In order to account for errors within the sequence, the assembler will look closely at reads with an optimal kmer length and eliminate any kmers below the length used as a cutoff to mitigate any reads that might include errors.
</p>
              </div>
            </Link>
            <Link to="tool11">
              <div className="infobox">
                <p className="infotitle">Mapping</p>
                <p className="infodescription">The Mapping tool will take one or more read kmers in one file and the chromosome you want to compare against in another file both in fasta format. It will use a combination of a suffix array, first column, burrows wheeler, and last to first to generate the locations of the occurrences in the chromosome. It also breaks the kmer reads into smaller reads to handle errors in the reads.
</p>
              </div>
            </Link>
          </div>
      </div>
    );
  }
});
var Tool1 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="dnaA Boxes"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool2 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="Translation"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool3 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="Transcription"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool4 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="Reverse Transcription"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool5 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="Suffix Tree"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool6 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="Suffix Array"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool7 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="Burrows Wheeler Transform"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool8 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="BWT First Column"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool9 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="First To Last"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool10 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="DeBruijn Graph Assembly"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});
var Tool11 = React.createClass({
  getInitialState: function() {
    return {input: this.props.defaultinput};
  },
  handleInputChange: function(e) {
   this.setState({input: e.target.value});
  },
  render : function() {
        return (
          <div>
          <Header name="Mapping"/>
            <form className="form">
              <textarea name="input" rows="18" placeholder="Input..." onChange={this.handleInputChange}></textarea>
              <div className="buttoncontainer">
              <button type="button" className="button" onClick={this.handleSubmit}>Submit</button>
              <p onClick={this.handleSubmit}>or use default data</p>
              </div>
            </form>
            <Link to="home">Back to Toolbox</Link>
          </div>
        );
  },
  handleSubmit: function() {
    if(this.state.input){
        console.log(this.state.input);
    }else{
      console.log("use default");
    }
  }
});


var Page = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Page</h1>
        <p>Demo another page here</p>
      </div>
    );
  }
});

// Run the routes
var routes = (
      <Router>
        <Route name="app" path="/" component={App}>
          <Route name="page" path="/page" component={Page} />
          <Route name="tool1/:input" path="/tool1" component={Tool1} />
          <Route name="tool2/:input" path="/tool2" component={Tool2} />
          <Route name="tool3/:input" path="/tool3" component={Tool3} />
          <Route name="tool4/:input" path="/tool4" component={Tool4} />
          <Route name="tool5/:input" path="/tool5" component={Tool5} />
          <Route name="tool6/:input" path="/tool6" component={Tool6} />
          <Route name="tool7/:input" path="/tool7" component={Tool7} />
          <Route name="tool8/:input" path="/tool8" component={Tool8} />
          <Route name="tool9/:input" path="/tool9" component={Tool9} />
          <Route name="tool10/:input" path="/tool10" component={Tool10} />
          <Route name="tool11/:input" path="/tool11" component={Tool11} />
          <Route path="*" component={Home}/>
        </Route>
      </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
