import React from 'react';

function MoveSwitch(props){
    const checkMoveType = e => {
        props.checkMoveType(e);
    }
    return (
    <React.Fragment>
        <div className="write_input_wrap">
            <div className="write_input_title">
            {props.lang == 0 && '이동 수단'}
            {props.lang == 1 && 'Transportation'}
            {props.lang == 2 && 'vận chuyển'}
            </div>
            <div className="write_input box_line" style={{padding:'5px'}}>
                <ul className="move_icons_wrap">
                    <li >
                        <label htmlFor="car" className="point">
                            <input className="none" id="car"  type="radio" name="move_type" value="1" defaultChecked={props.moveType == 1 ? true : false}
                            onClick={checkMoveType}
                            />
                            <i className="fas fa-car"></i>
                        </label>
                    </li>
                    <li >
                        <label className="point" htmlFor="bus" >
                            <input className="none" id="bus"  type="radio" name="move_type" value="2" onClick={checkMoveType}
                            defaultChecked={props.moveType == 1 ? true : false}
                            />
                            <i className="fas fa-bus"></i>
                        </label>
                    </li>
                    <li >
                        <label className="point" htmlFor="walk" >
                            <input className="none" id="walk" type="radio" name="move_type" value="3" onClick={checkMoveType}
                            defaultChecked={props.moveType == 1 ? true : false}
                            />
                            <i className="fas fa-walking"></i>
                        </label>
                    </li>
                    <li >
                        <label className="point" htmlFor="air" >
                            <input className="none" id="air"  type="radio" name="move_type" value="4" onClick={checkMoveType}
                            defaultChecked={props.moveType == 1 ? true : false}
                            />
                            <i className="fas fa-plane-departure"></i>
                        </label>
                    </li>
                    <div className="input_hidden">
                    </div>
                </ul>
            </div>
        </div>
    </React.Fragment>
    )
}
export default MoveSwitch;