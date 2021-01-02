import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

Container.propTypes = {
    container: PropTypes.array,
};

Container.defaultProps = {
    container: []
}


function Container(props) {

    const { container } = props

    // let arraySend = []
    // const categorySend = container.map(value => {
    //     if (value.category === 'send')
    //         return arraySend.push(value.chat)
    // })

    // console.log(arraySend)


    // let arrayReceive = []
    // const categoryReceive = container.map(value => {
    //     if (value.category === 'receive')
    //         return arraySend.push(value.chat)
    // })

    // console.log(arrayReceive)



    // const send = (
    //     container && container.map((value, index) => (
    //         <div className="media media-chat media-chat-reverse" key={index}>
    //             <div className="media-body">
    //                 <p>{value.chat}</p>
    //             </div>
    //         </div> 
    //     ))
    // )

    // const receive = (
    //     <div className="media media-chat">
    //         <div className="media-body">
    //             <p>Bạn tên gì?</p>
    //         </div>
    //     </div>
    // )

    return (
        <div>
            {
                container && container.map((value, index) => (
                    <div className="media media-chat media-chat-reverse" key={index}>
                        <div className="media-body">
                            <p>{value.chat}</p>
                        </div>
                    </div> 
                ))
            }
        </div>
    );
}

export default Container;