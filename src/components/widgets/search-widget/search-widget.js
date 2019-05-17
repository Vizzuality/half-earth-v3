import { loadModules } from '@esri/react-arcgis';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import SearchWidgetComponent from './search-widget-components';

const SearchWidget = ({ view }) => {
  const onClick = () => {
    loadModules(["esri/widgets/Search"]).then(([Search]) => {
      const sWidget = new Search({
        view: view,
        locationEnabled: false // don't show the Use current location box when clicking in the input field
      });
      view.ui.add(sWidget, "top-left");
      sWidget.viewModel.on("search-clear", function(event){
        view.ui.remove(sWidget);
      });
      sWidget.watch('activeSource', function(evt){
        evt.placeholder = "Find Place";
      });
    }).catch((err) => console.error(err));
  };

  useEffect(() => {
    const node = document.createElement("div");
    view.ui.add(node, "top-left");
    ReactDOM.render(<SearchWidgetComponent onClick={onClick} />, node);
  }, [view])

  return null;
}

export default SearchWidget;
