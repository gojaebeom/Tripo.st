import { Link } from "react-router-dom"

<StarWidget 
                    lang={props.lang}
                    isLoading={props.isLoading}
                    setSnackbar={props.setSnackbar}
                />
{
    reviews.map( e => {
        return (
            <div key={e.review.id} className="footage-review-box">
                <div className="top">
                    <div className="left">
                        <div className="detail_contents_profile">
                            <div className="profile" style={{
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>
                                <Link to={`/users/${e.user.id}`} className="header"
                                    style={{width:'32px',height:'32px',marginRight:'5px'}}
                                >
                                    <img className="profile" style={{width:'100%',height:'100%',borderRadius:'100%'}}
                                    src={
                                        e.user.profile_photo !== null && e.user.profile_photo !== ''?
                                        '/media/'+e.user.profile_photo :
                                        '/static/img/profile_default.png'
                                    }
                                    alt="profile_default"/>
                                    {footage.user.expert == 1 && <div className="master_img"><img src="/static/img/master.png" alt="master"/></div>}
                                </Link>
                                <div className="username">{e.user.nickname}</div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <i className="fas fa-star"></i>
                        <span>{e.review.rate}</span>
                    </div>
                </div>
                <div className="bottom">
                    { props.lang == 0 && e.review.content_kr }
                    { props.lang == 1 && e.review.content_en }
                    { props.lang == 2 && e.review.content_vi }
                </div>
            </div>
        )
    })
}