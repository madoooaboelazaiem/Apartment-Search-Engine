const { UserInputError } = require('apollo-server-express');
const { getLastElement } = require('./array');

// TODO: Backward pagination; Current implementation does only perform forward pagination
function paginateData({ data, after, first = 10 }) {
  let slice;

  if (first < 1) {
    slice = [];
  } else if (!after) {
    slice = data.slice(0, first);
  } else {
    const cursorIndex = getCursorIndex({ data, cursor: after });
    slice = getSlice({ data, cursorIndex, pageSize: first });
  }
  const pageInfo = getPageInfoBySlice({ slice, data });

  return {
    nodes: slice,
    edges: getEdgesFromSlice(slice),
    pageInfo: pageInfo,
    totalCount: data.length,
  };
}

function getCursor(node) {
  return node ? Buffer.from(node._id.toString()).toString('base64') : null;
}

function getCursorIndex({ data, cursor }) {
  return data.findIndex((node) => {
    return getCursor(node) === cursor;
  });
}

function getSlice({ data, cursorIndex, pageSize }) {
  if (cursorIndex >= 0) {
    const lastElementIndex = data.length - 1;
    if (cursorIndex === lastElementIndex) {
      return [];
    } else {
      const firstIndexToReturn = cursorIndex + 1;
      const lastIndexToReturn = Math.min(
        data.length - 1,
        firstIndexToReturn + (pageSize - 1),
      );
      return data.slice(firstIndexToReturn, lastIndexToReturn + 1);
    }
  } else {
    // invalid cursor
    throw new UserInputError('Invalid cursor provided.');
  }
}

function getPageInfoBySlice({ slice, data }) {
  const firstElementInSlice = slice[0];
  const firstElementInDataset = data[0];
  const lastElementInSlice = getLastElement(slice);
  const lastElementInDataset = getLastElement(data);
  return {
    hasNextPage: lastElementInSlice !== lastElementInDataset,
    hasPreviousPage: firstElementInSlice !== firstElementInDataset,
    startCursor: getCursor(firstElementInSlice),
    endCursor: getCursor(lastElementInSlice),
  };
}

function getEdgesFromSlice(slice) {
  const edges = [];
  slice.forEach((node) => {
    edges.push({
      node: node,
      cursor: getCursor(node),
    });
  });
  return edges;
}

module.exports = {
  paginateData,
  getCursor,
  getEdgesFromSlice,
  getPageInfoBySlice,
};
