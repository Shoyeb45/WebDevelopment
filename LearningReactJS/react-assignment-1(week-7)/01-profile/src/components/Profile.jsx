import "./../styles/Profile.css"

export function Profile({ user: profile }) {
    console.log(profile.coverImage);
        
    return (
        <div className="profile">
            <div className="img-container">
                <img src={profile.coverImage} alt="cover-image" width={"350vw"} className="cover-image"/>
                <img src={profile.profileImage} alt="profile-image" width={"80vw"} className="profile-image"/>
            </div>

            <div className="profile-body">
                <div className="name">
                    {profile.name}
                </div>
                <div className="city">
                    {profile.city}
                </div>

            </div>

            <div className="stats">
                <Stats count={profile.stats.followers} type="Followers"></Stats>
                <Stats count={profile.stats.likes} type="Likes"></Stats>
                <Stats count={profile.stats.photos} type="Photos"></Stats>
            </div>
        </div>
    )
}

function Stats({ count, type }) {
    return (
        <div className="individual-stats">
            <div className="count">{count}</div>
            <div className="type">{type}</div>
        </div>
    )
}