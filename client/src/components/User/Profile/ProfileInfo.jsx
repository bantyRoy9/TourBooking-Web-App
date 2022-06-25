import React from 'react'
import { NavLink } from 'react-router-dom'
import ProfileNav from './ProfileNav'

const ProfileInfo = ({ user }) => {
  return (
    <>{user && 
    <div className="profile-container">
    <div>
       <ProfileNav user={user}/>
    </div>
    <div className="profile-info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate repellendus voluptatem tempore velit, nemo iste, accusantium fugiat hic officiis, assumenda dolore odio sed voluptatibus voluptate voluptatum tenetur culpa exercitationem odit.

    </div>
</div>}
    </>
  )
}

export default ProfileInfo