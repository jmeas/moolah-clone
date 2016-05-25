import _ from 'lodash';
import React from 'react';

export default function DeleteCategoryModal(props) {
  function onClickCancelBtn(e) {
    e.preventDefault();
    _.result(props, 'onClickCancel');
  }

  function onClickDeleteBtn(e) {
    e.preventDefault();
    _.result(props, 'onClickDelete');
  }

  const deleteBtnText = props.currentlyDeleting ? 'Deleting...' : 'Delete';

  return (
    <div className="delete-category-modal">
      <h1 className="modal-title">
        Delete "{props.category.label}"?
      </h1>
      <div className="form-row">
        <button
          onClick={onClickCancelBtn}
          className="btn btn-line delete-category-modal-cancel"
          disabled={props.currentlyDeleting}>
          Cancel
        </button>
        <button
          onClick={onClickDeleteBtn}
          className="btn delete-category-modal-confirm"
          disabled={props.currentlyDeleting}>
          {deleteBtnText}
        </button>
      </div>
    </div>
  );
}