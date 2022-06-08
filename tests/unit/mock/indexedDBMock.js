class IndexedDBMock {
  open() {
    return this;
  }
}

global.indexedDB = new IndexedDBMock();
