import React, { Component } from 'react'
import Spinner from './Spinner.js';
import NewsItems from './NewsItems.js'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps={
      country:'in',
      pageSize:8,
      category:'general'
    }

    static propTypes={
      pageSize:PropTypes.number,
      country:PropTypes.string,
      category:PropTypes.string
    }

    constructor(props){
        super(props);
        this.state={
                articles:[],
                loading:false,
                page:1,
                totalResults:0
        }
        document.title=`${this.CapitalizeFirstLetter(this.props.category)}-NewsToday`;
    }
    CapitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    async updatenews(pageNo)
    {
      this.props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9a77f1061aa4f8982ff0795ed6dd600&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      this.props.setProgress(30);
      let data=await fetch(url);
      this.props.setProgress(70);
      let parsedData=await data.json();
      console.log(parsedData);
      this.setState({articles:parsedData.articles,
        totalResults:parsedData.totalResults,loading:false
      });
      this.props.setProgress(100);

    }
    async componentDidMount(){
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9a77f1061aa4f8982ff0795ed6dd600&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data=await fetch(url);
        // let parsedData=await data.json();
        // console.log(parsedData);
        // this.setState({articles:parsedData.articles,
        //   totalResults:parsedData.totalResults,loading:false
        // });
        this.updatenews();
    }
    
    handleprevclick=async()=>{
      // console.log("previous");
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9a77f1061aa4f8982ff0795ed6dd600&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      //   let data=await fetch(url);
      //   let parsedData=await data.json();
      //   console.log(parsedData);
      //   this.setState({articles:parsedData.articles})
      //   this.setState({
      //     page:this.state.page-1,
      //     loading:false,

      //   })
      this.setState({page:this.state.page-1});
      this.updatenews();
    }
    handlenextclick=async()=>{
      console.log("next");
      // if ((this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))) {
        
      // }
      // else
      // {

      //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9a77f1061aa4f8982ff0795ed6dd600&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      //    this.setState({loading:true});
      //  let data=await fetch(url);
      //   let parsedData=await data.json();
      //   this.setState({articles:parsedData.articles})
      //   this.setState({
      //     page:this.state.page+1,
      //     loading:false,
          
        // })
        this.setState({page:this.state.page+1});
        this.updatenews();
      }
      
      
      
    // }

      fetchMoreData=async()=>{
          this.setState({page:this.state.page+1});
          const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9a77f1061aa4f8982ff0795ed6dd600&page=${this.state.page}&pageSize=${this.props.pageSize}`;
          this.setState({loading:true})
          let data=await fetch(url);
          let parsedData=await data.json();
          console.log(parsedData);
          this.setState({articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,loading:false,
          });
      };
      render() {
    return (

      <div className='container my-3'>
      <h1 className="text-center">NewsToday-Top {this.CapitalizeFirstLetter(this.props.category)} Headlines</h1>
      {/* {this.state.loading&&<Spinner/>} */}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className="row">
      {this.state.articles.map((element)=>{
         
           return <div className="col-md-4" key={element.url}>
                    
                    <NewsItems newsurl={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
      })}
        </div>
      </InfiniteScroll>
      
      </div>
    )
  }
}
