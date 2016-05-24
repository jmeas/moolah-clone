import React from 'react';
import CategoryListItem from '../category-list-item';
import Modal from '../../../common/components/modal';
import DeleteCategoryModal from '../delete-category-modal';

const CategoriesList = React.createClass({
  getInitialState() {
    return {
      isModalOpen: false,
      categoryToDelete: null
    };
  },

  onClickDelete(category) {
    this.setState({
      isModalOpen: true,
      categoryToDelete: category
    });
  },

  onClickModalCancel() {
    this.setState({
      isModalOpen: false,
      categoryToDelete: null
    });
  },

  onClickModalDelete() {
    const {categoriesActions} = this.props;
    const category = this.state.categoryToDelete;
    categoriesActions.deleteCategory(category.id);
  },

  createModal() {
    const childrenProps = {
      onClickCancel: this.onClickModalCancel,
      onClickDelete: this.onClickModalDelete,
      category: this.state.categoryToDelete,
      currentlyDeleting: this.props.currentlyDeleting
    };

    const modalProps = {
      children: (<DeleteCategoryModal {...childrenProps}/>),
      modalClassName: 'delete-category-modal-container'
    };

    return (<Modal {...modalProps}/>);
  },

  // We check to see if there was a successful delete by comparing props.
  // If there was, then we close the modal.
  componentWillReceiveProps(nextProps) {
    // If the modal isn't open, then there's nothing to check
    if (this.state.isModalOpen === false) {
      return;
    }

    const wasDeleting = this.props.currentlyDeleting;
    const successfulDelete = nextProps.deleteCategorySuccess;

    // If we were deleting, and the delete is successful, then we can
    // close the modal.
    if (wasDeleting && successfulDelete) {
      this.setState({
        isModalOpen: false,
        categoryToDelete: null
      });
    }
  },

  render() {
    const {
      categories, currentlyDeleting, isOnline
    } = this.props;

    const modal = this.state.isModalOpen ? this.createModal() : null;

    return (
      <div className="categories-list resource-list-container">
        {modal}
        <ul className="resource-list">
          {categories.map(category => (
            <CategoryListItem
              isOnline={isOnline}
              category={category}
              key={category.id}
              onClickDelete={this.onClickDelete}
              currentlyDeleting={currentlyDeleting}/>
          ))}
        </ul>
      </div>
    );
  }
});

export default CategoriesList;
