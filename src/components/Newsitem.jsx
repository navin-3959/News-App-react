/* eslint-disable react/prop-types */

const  Newsitem =(props)=> {
 
    let { title, description, imgurl, newsurl, author , date } = props; 
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgurl} className="card-img-top" alt="News" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default Newsitem;
