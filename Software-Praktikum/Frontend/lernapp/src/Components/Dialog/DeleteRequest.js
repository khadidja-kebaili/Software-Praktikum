import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from '../../API/LernappAPI';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * Löschdialog für das Löschen von Requests.
 *
 * @author [Khadidja Kebaili](https://github.com/KhadidjaKebaili)
 */


class DeleteRequest extends Component {
    constructor(props){
        super(props);

        this.state = {
            deletingInProgress: false,
            deletingError: null
            
        };
    }

    /**
     * Löscht einen Einzel-Request mithilfe der RequestID. Setzt während eines erfolgreichen Löschvorgangs
     * den deletingInProgress auf True, ansonsten verbleibend auf false wirft eine Fehlermeldung.
     */

    deleteRequest = (id1) => {
        let id = this.props.request.getID()
        LernappAPI.getAPI().deleteRequest(id).then(request => {
            this.setState({  //Setzt neuen State, wenn der request gefetcht wurde.
                deletingInProgress: false, //Setzt Löschvorgang im State auf false.
                deletingError: null        //Fehlermeldung auf null setzen.
            })
            this.props.onClose(this.props.request);
        }).catch(e =>
            this.setState({
                deletingInProgress: false,//Bei fehlgeschlagenem Fetch-Vorgang wird Löschvorgang deaktiviert
                deletingError: e          //Fehler wird in den State gesetzt.
            })
        );

        // set loading to true
        this.setState({
            deletingInProgress: true, //Setzt Löschvorgang im State auf true.
            deletingError: null       //Fehlermeldung auf null setzen.
        });
    }



    deleteGroupRequest = (id1) => {
        LernappAPI.getAPI().deleteRequest(this.props.requestGroup.getID()).then(request => {
            this.setState({  //Setzt neuen State, wenn der request gefetcht wurde.
                deletingInProgress: false, //Setzt Löschvorgang im State auf false.
                deletingError: null        //Fehlermeldung auf null setzen.
            })
            this.props.onClose(this.props.requestGroup);
        }).catch(e =>
            this.setState({// Reseten den State mit zurückgegebener Fehlermeldung
                deletingInProgress: false, // Ladevorgang wird auf false gesetzt
                deletingError: e          // Fehlermeldung wird zurückgegeben.
            })
        );

        this.setState({
            deletingInProgress: true,  //Setzt Löschvorgang im State auf true.
            deletingError: null        //Fehlermeldung auf null setzen.
        });
    }

    /**
     * Handelt den Abbruch des Löschvorgangs oder das Schließen des Dialogs nach erfolgreichen Löschung.
     */
    handleClose = () => {
        this.props.onClose(null);
    }

    render() {
        return(
            <div>
                {/*Dialog der geöffnet wird, wenn props.show auf True gesetzt wird. Beim Schließen
                wird die handleClose-Methode ausgeführt.*/}
                <Dialog open={this.props.show} onClose = {this.handleClose}>
                    <DialogTitle id="alert-dialog-title">Willst du wirklich die Anfrage löschen?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Wenn Sie auf Ablehnen klicken wird der Request für immer gelöscht
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>
                            Abbrechen
                        </Button>
                        {/*Bei Betätigung des Buttons, wird die Methode deleteRequest ausgeführt.*/}
                        <Button color="primary" onClick={this.deleteRequest}>
                            Ja, Ablehnen
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }}


export default DeleteRequest;