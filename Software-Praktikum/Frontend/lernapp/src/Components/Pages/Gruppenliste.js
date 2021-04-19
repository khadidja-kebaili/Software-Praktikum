class Gruppenliste extends Component {

    constructor(props) {
      super(props);
  
      //gebe einen leeren status
      this.state = {
          Gruppe: [],
          filteredGruppen: [],
          GruppenFilter: '',
          showGruppenForm: false,
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
          filteredGruppen: this.state.Gruppen.filter(Gruppe => {
              let nameContainsValue = Gruppen.getname().toLowerCase().includes(value);
              return nameContainsValue;
          }),
          GruppenFilter: value
      });
  }
  
  //Suche leeren
  clearFilterFieldButtonClicked = () => {
      this.setState({
          filteredGruppen: [...this.state.Gruppen],
          GruppenFilter: ''
      });
  }
}
