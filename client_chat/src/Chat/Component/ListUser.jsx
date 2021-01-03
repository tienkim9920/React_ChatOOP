import React from 'react';
import PropTypes from 'prop-types';

ListUser.propTypes = {
    listUser: PropTypes.array,
    GetUserID: PropTypes.func
};

ListUser.defaultProps = {
    listUser: [],
    GetUserID: null
}

function ListUser(props) {

    const { listUser, GetUserID } = props

    const onClickUser = (user_id) => {
        
        GetUserID(user_id)

    }

    return (
        <div>
            {
                listUser && listUser.map(value => (
                    <div className="row sideBar-body" key={value._id} onClick={() => onClickUser(value._id)}>
                        <div className="col-sm-3 col-xs-3 sideBar-avatar">
                            <div className="avatar-icon">
                                <img src={value.image} />
                            </div>
                        </div>
                        <div className="col-sm-9 col-xs-9 sideBar-main">
                            <div className="row">
                                <div className="col-sm-8 col-xs-8 sideBar-name">
                                    <span className="name-meta">{value.name}</span>
                                </div>
                                <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                                    <span className="time-meta pull-right">Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ListUser;