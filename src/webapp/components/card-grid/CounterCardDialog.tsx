import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";

import { Theme, createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Restore from "@material-ui/icons/Restore";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            padding: 0,
            margin: "0.5rem",
            float: "left",
            width: "230px",
        },
        details: {
            display: "flex",
            flexDirection: "column",
        },
        content: {
            flex: "1 0 auto",
        },
        cover: {
            width: 151,
        },
        controls: {
            display: "flex",
            alignItems: "center",
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },

        form: {
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            width: "fit-content",
        },
        formControl: {
            marginTop: theme.spacing(2),
            minWidth: 120,
        },
        formControlLabel: {
            marginTop: theme.spacing(1),
        },
    })
);

export const CounterCardDialog: React.FC<viewProps> = props => {
    const { viewflag } = props;

    const classes = useStyles();
    const theme = useTheme();
    const [counter, setCounter] = React.useState<number>(1);
    const [open, setOpen] = React.useState(viewflag);

    const handleClickOpen1 = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (viewflag) {
            handleClickOpen1();
        }
    }, [viewflag]);

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">New Counter</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Card className={classes.root}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        Couter Page
                                    </Typography>
                                    <hr></hr>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Result: {counter}
                                    </Typography>
                                </CardContent>
                                <div className={classes.controls}>
                                    <IconButton
                                        aria-label="decrease"
                                        onClick={() => setCounter(counter <= 0 ? 0 : counter - 1)}
                                    >
                                        {theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                    </IconButton>
                                    <IconButton aria-label="reset" onClick={() => setCounter(0)}>
                                        <Restore className={classes.playIcon} />
                                    </IconButton>
                                    <IconButton aria-label="increase" onClick={() => setCounter(counter + 1)}>
                                        {theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                    </IconButton>
                                </div>
                            </div>
                            <CardMedia className={classes.cover} image="" title="counter page" />
                        </Card>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

interface viewProps {
    viewflag: boolean;
}
