


export default class LinkedList {
  constructor(nodes) {
    this.cursor = 0;
    this.head = nodes.map((node, i, _nodes) => {
      return new Link(node);
    }).map((link, i, links) => {
      link.prev = links[i - 1];
      link.next = links[i + 1];
    })[0];
  }

  next() {
    this.cursor++;
    return 
  }

  prev() {
    
  }
}

class Link {
  constructor(val, prev, next) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}