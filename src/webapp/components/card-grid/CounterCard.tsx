import React from "react";

import { Theme, createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Restore from "@material-ui/icons/Restore";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            padding: 10,
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

export const CounterCard: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [counter, setCounter] = React.useState<number>(1);

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Couter Page
                        </Typography>
                        <hr></hr>
                        <Typography variant="subtitle1" color="textSecondary">
                            Couter Result: {counter}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton aria-label="decrease" onClick={() => setCounter(counter <= 0 ? 0 : counter - 1)}>
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
        </React.Fragment>
    );
};
