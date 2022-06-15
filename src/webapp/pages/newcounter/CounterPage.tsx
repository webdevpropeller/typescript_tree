import React from "react";
import styled from "styled-components";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ArrowBack from "@material-ui/icons/ArrowBack";

import { useHistory } from "react-router-dom";
import { CounterCard } from "../../components/card-grid/CounterCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: "left",
        },
    })
);

export const CounterPage: React.FC<ExampleProps> = props => {
    const history = useHistory();
    const { name } = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Title>New couter manager page! {name}</Title>
                        <Button
                            startIcon={<ArrowBack />}
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                history.push("/");
                            }}
                        >
                            back landing page
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <CounterCard />
        </React.Fragment>
    );
};
const Title = styled.h3`
    color: blue;
`;

interface ExampleProps {
    name: string;
}
