import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardGrid } from "../../components/card-grid/CardGrid";
import { CounterCardDialog } from "../../components/card-grid/CounterCardDialog";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const initialState = {
    mouseX: null,
    mouseY: null,
};


export const LandingPage: React.FC = () => {
    const history = useHistory();    

    const [state, setState] = React.useState<{
        mouseX: null | number;
        mouseY: null | number;
      }>(initialState);

   const [showMenu, setShowMenu] =  React.useState(false);

   
    const handleClose = () => {
        setState(initialState);
        setShowMenu(false);
      };
    
    const handleClickOpen = () => {
               
         setState(initialState); 
         setShowMenu(!showMenu);  
       
    };


    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setState({
          mouseX: event.clientX - 2,
          mouseY: event.clientY - 4,
        });
      };    

    const cards: Card[] = [
        {
            title: "Section",
            key: "main",
            children: [
                {
                    name: "John",
                    description: "Entry point 1",
                    listAction: () => history.push("/for/John"),
                },
                {
                    name: "Mary",
                    description: "Entry point 2",
                    listAction: () => history.push("/for/Mary"),
                },
                {
                    name: "New Counter",
                    description: "counter manager page",
                    listAction: () => history.push("/new/"),
                },
                {
                    name: "Organisation",
                    description: "Entry point 4",
                    listAction: () => history.push("/organisation"),
                },
            ],
        },
    ];

    return (
        <React.Fragment>
            <div onContextMenu={handleClick} style={{ cursor: "context-menu" }}>
                <Menu
                    keepMounted
                    open={state.mouseY !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        state.mouseY !== null && state.mouseX !== null
                            ? { top: state.mouseY, left: state.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={handleClickOpen}>Open Couter Page</MenuItem>
                    <MenuItem onClick={handleClose}>Close</MenuItem>
                </Menu>
                <CardGrid cards={cards} />
            </div>
            <CounterCardDialog viewflag={showMenu} />
        </React.Fragment>
    );
};
