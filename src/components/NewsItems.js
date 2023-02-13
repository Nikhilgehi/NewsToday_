import React, { Component } from 'react'

export default class NewsItems extends Component {
   
    render() {
      let {title ,description,imageUrl,newsurl,author,date,source}=this.props; //props passed..
    return (
        <div className='my-3'>
                <div className="card" style={{width: "18rem"}}>
                <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title} <span class=" badge text-bg-info">{source}</span></h5>
                    <p className="card-text">{description}</p>
                    <a href={newsurl}  className="btn btn-dark">Read More</a>
                    <div class="card-footer">
                        <small class="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small>
                    </div>
                </div>
                </div>    
  </div>
    )
  }
}
