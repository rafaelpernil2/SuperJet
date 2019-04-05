/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./demo-update-item-view.html', './demo-update-item-viewModel', 'text!./component.json', 'css!./demo-update-item-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('demo-update-item', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);