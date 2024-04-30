import React from 'react';
import { Link, useParams} from 'react-router-dom';
import './Style/home.css'

const Home = ({username}) => {
 
    const params = useParams();

    const { email } = params; 
    return (
        <div>
              <div className='box-container'>
                <div class="card" style={{width:"50rem"}}>
                   
                    <div class="card-body">
                        <h1 class="card-title text-center">Hello {username} !</h1>
                        <p class="card-text text-center">Welcome to Url Shortener Application</p>
                        <div className='d-flex justify-content-center'>

                        <Link to='/urlshortener/${email}'> <button className='btn btn-danger' >Url Shortener</button> </Link>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Home;