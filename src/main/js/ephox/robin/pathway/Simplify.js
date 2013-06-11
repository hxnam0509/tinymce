define(
  'ephox.robin.pathway.Simplify',

  [
    'ephox.compass.Arr',
    'ephox.peanut.Fun'
  ],

  function (Arr, Fun) {
    var eq = function (universe, e1) {
      return Fun.curry(universe.eq, e1);
    };

    var isDuplicate = function (universe, rest, item) {
      return Arr.exists(rest, eq(universe, item));
    };

    var isChild = function (universe, rest, item) {
      var parents = universe.up().all(item);
      return Arr.exists(parents, function (p) {
        return isDuplicate(universe, rest, p);
      });
    };

    // FIX: Horribly inefficient.
    var simplify = function (universe, items) {
      return Arr.filter(items, function (x, i) {
        var left = items.slice(0, i);
        var right = items.slice(i + 1);
        var rest = left.concat(right);
        return !(isDuplicate(universe, right, x) || isChild(universe, rest, x));
      });
    };

    return {
      simplify: simplify
    };
  }
);
