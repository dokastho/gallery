import PropTypes from 'prop-types';
import React from 'react'

class DropDownSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      filteredItems: [],
      selectedItems: [],
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.deselectItem = this.deselectItem.bind(this);

    this.submit = this.submit.bind(this);
  }

  submit() {
    const { selectedItems } = this.state;
    const { target } = this.props;

    fetch(target,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedItems })
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .catch((error) => console.log(error));

    this.cancelSearch();
  }

  selectItem(item) {
    const { selectedItems, filteredItems } = this.state;
    const filteredItemsWithoutItem = filteredItems.filter(filteredItem => item !== filteredItem);
    const selectedItemsWithItem = selectedItems.concat(item);

    this.setState({ searchTerm: "", selectedItems: selectedItemsWithItem, filteredItems: filteredItemsWithoutItem });
  }

  deselectItem(item) {
    const { searchTerm, selectedItems, filteredItems } = this.state;
    const filteredItemsWithItem = filteredItems.concat(item);
    const selectedItemsWithoutItem = selectedItems.filter(selectedItem => item !== selectedItem);

    this.setState({ selectedItems: selectedItemsWithoutItem, filteredItems: filteredItemsWithItem });
    this.updateSearch(searchTerm);
  }

  updateSearch(searchTerm) {
    const { selectedItems } = this.state;
    const { items } = this.props;
    if (searchTerm == "") {
      this.setState({ searchTerm, filteredItems: [] })
    }
    else {
      const filteredItems = items.filter(item => item.includes(searchTerm) && (selectedItems.indexOf(item) == -1));
      this.setState({ searchTerm, filteredItems });
    }
  }

  cancelSearch() {
    this.updateSearch("");
    this.setState({ selectedItems: [] });
  }

  render() {
    const {
      name,
      target,
      toggleRender,
    } = this.props;
    const {
      searchTerm,
      filteredItems,
      selectedItems,
    } = this.state;
    return (
      <div className='dropdown-search-field'>
        <h2>Share with:</h2>
        <input type='text' className={name} value={searchTerm} onChange={(e) => { this.updateSearch(e.target.value) }} />
        <input type='hidden' name='selection' value={selectedItems} />
        <input type="submit" value={'share'} onClick={() => { this.submit() }} />
        <input type='button' value={'cancel'} onClick={() => { this.cancelSearch(); toggleRender() }} />
        <ul className='dropdown-search'>
          {
            filteredItems.map((item) => {
              return (<li className='dropdown-search-item' onClick={() => { this.selectItem(item) }}>{item}</li>);
            })
          }
        </ul>
        <h2>selected:</h2>
        <ul className='dropdown-search'>
          {
            selectedItems.map((item) => {
              return (<li className='dropdown-selected-item' onClick={() => { this.deselectItem(item) }}>{item}</li>);
            })
          }
        </ul>
      </div>
    )
  }
}

DropDownSearch.propTypes = {
  name: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  items: PropTypes.instanceOf(Array),
  // toggleRender: close the dropdown render
};

export default DropDownSearch
