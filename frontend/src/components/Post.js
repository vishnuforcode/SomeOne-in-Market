import React from 'react'
import { Link } from 'react-router'

function Post(props) {

  
  return (
    <>



    <div className="card" style={{width:"288px"}}>
  <div className="card-body">
    <h5 className="card-title">{props.data.createdBy.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{props.data.content}</h6>

    <p className="card-text">{props.data.conditions}</p>
    <p>Return time : {props.data.tillTime}</p>
    <Link to={`${props.data._id}/request`} class="card-link">Request</Link>
    <Link  to={`${props.data._id}/rate`} class="card-link">rate</Link>
  </div>
</div>



    {/* <div className="col-3 d-flex">
    <div className="post">
        <div className="user">
            <p className='h3'>{props.data.createdBy.name}</p>
            <p>{props.data.content}</p>
        </div>

    </div>
    </div> */}
    </>
  )
}

export default Post
