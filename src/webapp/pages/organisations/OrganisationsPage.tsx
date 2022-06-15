import React, { useState } from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { TransitionProps } from "@material-ui/core/transitions";
import nodedata from "../../../../src/data/stubs/OrganisationUnits.json";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const MinusSquare = (props: SvgIconProps) => {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
};

const PlusSquare = (props: SvgIconProps) => {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
};

const TransitionComponent = (props: TransitionProps) => {
    return (
        <div>
            <Collapse {...props} />
        </div>
    );
};

const StyledTreeItem = withStyles((theme: Theme) =>
    createStyles({
        iconContainer: {
            "& .close": {
                opacity: 0.3,
            },
        },
        group: {
            marginLeft: 7,
            paddingLeft: 18,
            borderLeft: `1px dashed ${(theme.palette.text.primary, 0.4)}`,
        },
    })
)((props: TreeItemProps) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles(
    createStyles({
        root: {
            height: 264,
            flexGrow: 1,
            maxWidth: 400,
        },
    })
);

interface FlatItem {
    level: number;
    name: string;
    id: string;
    path: string;
    parent?: {
        id: string;
    };
}

const defaultValues = {
    name: "Almeria",
    age: 0,
    gender: "",
    os: "",
    favoriteNumber: 0,
  };

export const OrganisationsPage: React.FC = () => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState(defaultValues);
 
    const flatToHierarchy = (flat: FlatItem[]) => {

        //const root = {} as RootNode;
    
        const all: { [key: string]: any } = {};
    
        flat.forEach(item => {
          all[item.id] = { level: item.level, name: item.name, id: item.id, path: item.path, children: [] };
        });
    
        for(let level = 3; level > 1; level--) {
            flat.forEach(item => {
                if (item.level == level && typeof item.parent !== "undefined") {
                    if (Object.keys(all).some(e => e === item.parent!.id)) {
                        const p = all[item.parent!.id];
                        p.children.push(all[item.id]);
                        delete all[item.id];
                    }
                }
            });
        }

        let rootkey: string;

        Object.keys(all).forEach(key => {
            if (all[key].level == 1) {
                rootkey = key;
            }
        });

        return all[rootkey!];
    }


    const resdata = nodedata.organisationUnits;
    resdata.sort((a, b) => (a.name > b.name) ? 1 : -1);

    const data = flatToHierarchy(resdata);
    console.log(data);
   

    const renderTree = (node: any) => (
        <StyledTreeItem key={node.id} nodeId={node.id} label={node.name}>
          {Array.isArray(node.children) ? node.children.map((child: any) => renderTree(child)) : null}
        </StyledTreeItem>
    );

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormValues({
        ...formValues,
        [name]: value,
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("");
      };

    return (
        <div className="d-flex">
            <div className="w-25">
                <TreeView
                    className={classes.root}
                    defaultExpanded={["DVnpk4xiXGJ"]}
                    defaultCollapseIcon={<MinusSquare />}
                    defaultExpandIcon={<PlusSquare />}
                    defaultEndIcon={<PlusSquare />}                    
                    //defaultEndIcon={<CloseSquare />}
                >
                    {renderTree(data)}
                </TreeView>
            </div>
            <div className="flex-1">
                <h2 className="t-center">Technical test</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container justify="center" direction="column">
                        <Grid item>
                            <h3>Organisation unit</h3>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <TextField
                                    id="opening-date"
                                    name="opening-date"
                                    label="Opening date"
                                    type="text"
                                    value={"01/01/1970"}
                                    onChange={handleInputChange}
                                />
                             </FormControl>
                             <FormControl>
                                <TextField
                                    id="code"
                                    name="code"
                                    label="Code"
                                    type="text"
                                    value={"ES.AN.AM"}
                                    onChange={handleInputChange}
                                />
                             </FormControl>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" type="submit" disabled>
                            SAVE
                            </Button>
                            <Button style={{marginLeft: "10px"}} variant="contained" color="secondary">
                            CLEAR FORM
                            </Button>
                        </Grid>
                    </Grid>
                </form>            
            </div>
        </div>
    );
};
