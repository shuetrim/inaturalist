import { connect } from "react-redux";
import DragDropZone from "../components/drag_drop_zone";
import actions from "../actions/actions";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import ObsCard from "../models/obs_card";

const mapStateToProps = ( state ) => state.dragDropZone;

const mapDispatchToProps = ( dispatch ) => ( {
  onDrop: ( files, e ) => {
    // skip drops onto cards
    if ( $( ".card" ).has( e.nativeEvent.target ).length > 0 ) { return; }
    const obsCards = { };
    let i = 0;
    const startTime = new Date( ).getTime( );
    files.forEach( f => {
      i += 1;
      const obsCard = new ObsCard( {
        id: ( startTime + i ),
        description: f.name,
        preview: f.preview,
        lastModified: f.lastModified,
        lastModifiedDate: f.lastModifiedDate,
        size: f.size,
        type: f.type,
        file: f,
        upload_state: "pending",
        dispatch
      } );
      obsCards[obsCard.id] = obsCard;
    } );
    dispatch( actions.appendObsCards( obsCards ) );
    dispatch( actions.uploadImages( ) );
  },
  onCardDrop: ( files, e, obsCard ) => {
    const f = files[0];
    dispatch( actions.updateObsCard( obsCard, {
      description: f.name,
      preview: f.preview,
      lastModified: f.lastModified,
      lastModifiedDate: f.lastModifiedDate,
      size: f.size,
      type: f.type,
      file: f,
      upload_state: "pending",
      dispatch
    } ) );
  },
  updateObsCard: ( obsCard, updates ) => {
    dispatch( actions.updateObsCard( obsCard, updates ) );
  },
  updateSelectedObsCards: ( updates ) => {
    dispatch( actions.updateSelectedObsCards( updates ) );
  },
  removeObsCard: ( obsCard ) => {
    dispatch( actions.removeObsCard( obsCard ) );
  },
  submitObservations: ( ) => {
    dispatch( actions.submitObservations( ) );
  },
  createBlankObsCard: ( ) => {
    dispatch( actions.createBlankObsCard( ) );
  },
  selectObsCards: ( ids ) => {
    dispatch( actions.selectObsCards( ids ) );
  }
} );

const Uploader = connect(
  mapStateToProps,
  mapDispatchToProps
)( DragDropContext( HTML5Backend )( DragDropZone ) );

export default Uploader;