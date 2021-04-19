class Gruppenliste extends Component {

    constructor(props) {
      super(props);
  
      //gebe einen leeren status
      this.state = {
          Gruppe: [],
          filteredGruppe: [],
          GruppeFilter: '',
          showGruppeForm: false,
          showDeleteForm: false,
          error: null,
          loadingInProgress: false,
      };
    }
  
    //Button um neue Gruppe anzulegen. Damit öffnet sich das Dialog Fenster
    addButtonClicked = event => {
      event.stopPropagation();
      this.setState({
        showGruppenForm: true
      });
    }
  
    //Suche-Funktion zum Suchen von Gruppen
    filterFieldValueChange= event => {
      const value = event.target.value.toLowerCase();
      this.setState({
          filteredGruppe: this.state.semesterzz.filter(semester => {
              let nameContainsValue = semester.getname().toLowerCase().includes(value);
              return nameContainsValue;
          }),
          semesterFilter: value
      });
  }
  
  //Suche leeren
  clearFilterFieldButtonClicked = () => {
      this.setState({
          filteredSemester: [...this.state.semester],
          semesterFilter: ''
      });
  }
  
  //wird aufgerufen, wenn Dialog Fenster geschloßen wird
  semesterFormClosed = semester => {
      if (semester) {
        const newSemesterList = [...this.state.semester, semester];
        this.setState({
          semester: newSemesterList,
          filteredSemester: [...newSemesterList],
          showSemesterForm: false
        });
      } else {
        this.setState({
          showSemesterForm: false
        });
      }
    }
  
    // API Anbindung um alle Module vom Backend zu bekommen 
    getSemester = () => {
      ElectivAPI.getAPI().getSemester()
      .then(semesterBOs =>
          this.setState({
              semester: semesterBOs,
              filteredSemester: [...semesterBOs],
              error: null,
              loadingInProgress: false,
          })).catch(e =>
              this.setState({
                  semester: [],
                  filteredSemester: [],
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true,
      });
  }
  
  
    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getSemester();
    }
    
  
    /** Renders the component */
    render() {
      const { classes } = this.props;
      const {  loadingInProgress, error, semesterFilter, filteredSemester, showSemesterForm} = this.state;
  
      return (
        <div className={classes.root}>
          <Grid container spacing={2} alignItems="center">
              <Grid item >
              <TextField
                  className={classes.filter}
                  type='text'
                  label='Semester suchen'
                  value={semesterFilter}
                  onChange={this.filterFieldValueChange}
                  InputProps={{
                      endAdornment: <InputAdornment position='end'>
                      <IconButton onClick={this.clearFilterFieldButtonClicked}>
                          <ClearIcon fontSize="small"/>
                      </IconButton>
                      </InputAdornment>,
                  }}
              />
              </Grid>
              <Grid item xs/>
              <Grid item>
                  <Tooltip title='Semester anlegen' placement="left">
                      <Fab size="medium"  className={classes.addButton} color="primary" aria-label="add" onClick={this.addButtonClicked}>
                          <AddIcon />
                      </Fab>
                  </Tooltip>
              </Grid>
          </Grid>
          <Paper>
              <List className={classes.root} dense>
                  {
                  filteredSemester.map(semester => 
                      <SemesterListeEintrag key={semester.getID()} semester = {semester} show={this.props.show} getSemester={this.getSemester}/>)
                  }
              </List>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`Semester konnten nicht geladen werden.`} onReload={this.getSemester} />
          </Paper>
          <SemesterForm show={showSemesterForm} onClose={this.semesterFormClosed} getSemester= {this.getSemester}/>
        </div>
      );
    }
  }
  
  /** Component specific styles */
  const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        paddingTop: '4px'
    },
    addButton: {
        marginRight: theme.spacing(2)
    },
    filter: {
        marginLeft: theme.spacing(2)
    }
  });
  
  /** PropTypes */
  SemesterListe.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
  }
  
  
  