"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('frontend/app', ['exports', 'ember', 'frontend/resolver', 'ember-load-initializers', 'frontend/config/environment'], function (exports, _ember, _frontendResolver, _emberLoadInitializers, _frontendConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _frontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _frontendConfigEnvironment['default'].podModulePrefix,
    Resolver: _frontendResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _frontendConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('frontend/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'frontend/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _frontendConfigEnvironment) {

  var name = _frontendConfigEnvironment['default'].APP.name;
  var version = _frontendConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('frontend/components/champion-image/component', ['exports', 'ember', 'frontend/constants/champions'], function (exports, _ember, _frontendConstantsChampions) {
  exports['default'] = _ember['default'].Component.extend({

    imageUrl: _ember['default'].computed('championId', function () {
      var imageName = _frontendConstantsChampions['default'][this.get('championId')].image.full;
      return 'http://ddragon.leagueoflegends.com/cdn/6.8.1/img/champion/' + imageName;
    })

  });
});
define("frontend/components/champion-image/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "frontend/components/champion-image/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("img");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element0, 'src');
        morphs[1] = dom.createAttrMorph(element0, 'class');
        return morphs;
      },
      statements: [["attribute", "src", ["get", "imageUrl", ["loc", [null, [1, 11], [1, 19]]]]], ["attribute", "class", ["get", "size", ["loc", [null, [1, 30], [1, 34]]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('frontend/components/champion-name/component', ['exports', 'ember', 'frontend/constants/champions'], function (exports, _ember, _frontendConstantsChampions) {
  exports['default'] = _ember['default'].Component.extend({

    name: _ember['default'].computed('championId', function () {
      return _frontendConstantsChampions['default'][this.get('championId')].name;
    })

  });
});
define("frontend/components/champion-name/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "frontend/components/champion-name/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "name", ["loc", [null, [1, 0], [1, 8]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('frontend/components/format-number/component', ['exports', 'ember'], function (exports, _ember) {

  var MILLION = 1000000;

  exports['default'] = _ember['default'].Component.extend({

    short: null,

    number: null,

    formattedNumber: _ember['default'].computed('number', function () {
      var number = this.get('number');

      if (!number) return;

      if (this.get('short')) {
        if (number >= MILLION) {
          return (number / MILLION).toFixed(1) + 'M';
        }

        if (number >= 10000) {
          return (number / 1000).toFixed(1) + 'K';
        }
      }

      var formattedNumber = [];
      var numberArr = number.toString().split('').reverse();

      for (var i = 0; i < numberArr.length; i++) {
        if (i % 3 === 0 && i !== 0) {
          formattedNumber.push(',');
        }

        formattedNumber.push(numberArr[i]);
      }

      return formattedNumber.reverse().join('');
    })

  });
});
define("frontend/components/format-number/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "frontend/components/format-number/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "formattedNumber", ["loc", [null, [1, 0], [1, 19]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('frontend/components/home-container/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    classNames: ['container'],

    region: 'NA',

    actions: {
      setRegion: function setRegion(region) {
        this.set('region', region);
      }
    }

  });
});
define("frontend/components/home-container/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 0
          }
        },
        "moduleName": "frontend/components/home-container/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "summary-leaderboard-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "class", "leaderboard-header");
        var el3 = dom.createTextNode("How do you compare?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "content-container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "search-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "input-group input-group-lg");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "input-group-btn");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "button");
        dom.setAttribute(el4, "class", "btn btn-default dropdown-toggle");
        dom.setAttribute(el4, "data-toggle", "dropdown");
        dom.setAttribute(el4, "aria-haspopup", "true");
        dom.setAttribute(el4, "aria-expanded", "false");
        dom.setAttribute(el4, "style", "border-radius: 0px;");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "caret");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" \n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "dropdown-menu dropdown-menu-right");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        var el7 = dom.createTextNode("NA");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        var el7 = dom.createTextNode("OCE");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        var el7 = dom.createTextNode("EUW");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        var el7 = dom.createTextNode("EUNE");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "button");
        dom.setAttribute(el4, "class", "btn btn-default");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "glyphicon glyphicon-search");
        dom.setAttribute(el6, "aria-hidden", "true");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" /input-group ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" /.col-lg-6 ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [3]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element2, [3]);
        var element5 = dom.childAt(element2, [5]);
        var element6 = dom.childAt(element2, [7]);
        var element7 = dom.childAt(element1, [5, 1]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3]), 1, 1);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[3] = dom.createElementMorph(element3);
        morphs[4] = dom.createElementMorph(element4);
        morphs[5] = dom.createElementMorph(element5);
        morphs[6] = dom.createElementMorph(element6);
        morphs[7] = dom.createAttrMorph(element7, 'href');
        return morphs;
      },
      statements: [["inline", "leaderboard-overall", [], ["limit", 3], ["loc", [null, [4, 4], [4, 35]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "name", ["loc", [null, [9, 18], [9, 22]]]]], [], []], "placeholder", "xX3niperProXx", "class", "form-control"], ["loc", [null, [9, 4], [9, 73]]]], ["content", "region", ["loc", [null, [18, 8], [18, 18]]]], ["element", "action", ["setRegion", "NA"], [], ["loc", [null, [21, 12], [21, 39]]]], ["element", "action", ["setRegion", "OCE"], [], ["loc", [null, [22, 12], [22, 40]]]], ["element", "action", ["setRegion", "EUW"], [], ["loc", [null, [23, 12], [23, 40]]]], ["element", "action", ["setRegion", "EUNE"], [], ["loc", [null, [24, 12], [24, 41]]]], ["attribute", "href", ["concat", ["/search?name=", ["get", "name", ["loc", [null, [27, 32], [27, 36]]]], "&region=", ["get", "region", ["loc", [null, [27, 48], [27, 54]]]]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('frontend/components/leaderboard-overall/component', ['exports', 'frontend/constants/champions', 'ember'], function (exports, _frontendConstantsChampions, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    limit: null,

    initLeaderboard: _ember['default'].on('init', function () {
      var _this = this;

      var url = '/api/summary';

      if (this.get('limit')) {
        url += '?limit=' + this.get('limit');
      }

      _ember['default'].$.ajax({ url: url }).then(function (response) {
        _this.set('champions', response.rows);
      });
    }),

    champions: null,

    computedChampions: _ember['default'].computed('champions', function () {
      var champions = this.get('champions');

      if (!champions) return;

      return champions.map(function (champion) {
        var imageName = _frontendConstantsChampions['default'][champion.champion_id].image.full;

        champion.championName = _frontendConstantsChampions['default'][champion.champion_id].name;
        return champion;
      });
    }),

    sortedByProperty: 'points',

    sortedBy: 'desc',

    computedSort: _ember['default'].computed('sortedBy', 'sortedByProperty', function () {
      var sortedByProperty = this.get('sortedByProperty');
      var sortedBy = this.get('sortedBy');

      return [sortedByProperty + ':' + sortedBy];
    }),

    championsSorted: _ember['default'].computed.sort('computedChampions', 'computedSort'),

    actions: {
      orderBy: function orderBy(column) {
        var sortedByProperty = this.get('sortedByProperty');
        var sortedBy = this.get('sortedBy');

        if (sortedByProperty === column) {
          if (sortedBy === 'desc') {
            this.set('sortedBy', 'asc');
          } else {
            this.set('sortedBy', 'desc');
          }
        } else {
          this.set('sortedBy', 'desc');
        }

        this.set('sortedByProperty', column);
      }
    }

  });
});
define("frontend/components/leaderboard-overall/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 4
            },
            "end": {
              "line": 33,
              "column": 4
            }
          },
          "moduleName": "frontend/components/leaderboard-overall/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(element1, 1, 1);
          morphs[1] = dom.createMorphAt(element1, 3, 3);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
          return morphs;
        },
        statements: [["inline", "champion-image", [], ["championId", ["subexpr", "@mut", [["get", "champion.champion_id", ["loc", [null, [26, 36], [26, 56]]]]], [], []], "size", "small"], ["loc", [null, [26, 8], [26, 71]]]], ["content", "champion.championName", ["loc", [null, [27, 8], [27, 33]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "champion.points", ["loc", [null, [29, 33], [29, 48]]]]], [], []]], ["loc", [null, [29, 10], [29, 50]]]], ["content", "champion.name", ["loc", [null, [30, 10], [30, 27]]]], ["content", "champion.region", ["loc", [null, [31, 10], [31, 29]]]]],
        locals: ["champion"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 36,
            "column": 0
          }
        },
        "moduleName": "frontend/components/leaderboard-overall/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("table");
        dom.setAttribute(el1, "class", "table table-striped");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("thead");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        dom.setAttribute(el3, "class", "table-header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("\n        Champion\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("\n        Mastery Points\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("\n        Name\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("\n        Region\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tbody");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(element2, [1, 1]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element3, [3]);
        var element6 = dom.childAt(element3, [5]);
        var element7 = dom.childAt(element3, [7]);
        var morphs = new Array(9);
        morphs[0] = dom.createElementMorph(element4);
        morphs[1] = dom.createMorphAt(element4, 1, 1);
        morphs[2] = dom.createElementMorph(element5);
        morphs[3] = dom.createMorphAt(element5, 1, 1);
        morphs[4] = dom.createElementMorph(element6);
        morphs[5] = dom.createMorphAt(element6, 1, 1);
        morphs[6] = dom.createElementMorph(element7);
        morphs[7] = dom.createMorphAt(element7, 1, 1);
        morphs[8] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["orderBy", "championName"], [], ["loc", [null, [4, 10], [4, 45]]]], ["inline", "order-display", [], ["target", "championName", "current", ["subexpr", "@mut", [["get", "sortedByProperty", ["loc", [null, [6, 54], [6, 70]]]]], [], []], "type", ["subexpr", "@mut", [["get", "sortedBy", ["loc", [null, [6, 76], [6, 84]]]]], [], []]], ["loc", [null, [6, 8], [6, 86]]]], ["element", "action", ["orderBy", "points"], [], ["loc", [null, [8, 10], [8, 39]]]], ["inline", "order-display", [], ["target", "points", "current", ["subexpr", "@mut", [["get", "sortedByProperty", ["loc", [null, [10, 48], [10, 64]]]]], [], []], "type", ["subexpr", "@mut", [["get", "sortedBy", ["loc", [null, [10, 70], [10, 78]]]]], [], []]], ["loc", [null, [10, 8], [10, 80]]]], ["element", "action", ["orderBy", "name"], [], ["loc", [null, [12, 10], [12, 37]]]], ["inline", "order-display", [], ["target", "name", "current", ["subexpr", "@mut", [["get", "sortedByProperty", ["loc", [null, [14, 46], [14, 62]]]]], [], []], "type", ["subexpr", "@mut", [["get", "sortedBy", ["loc", [null, [14, 68], [14, 76]]]]], [], []]], ["loc", [null, [14, 8], [14, 78]]]], ["element", "action", ["orderBy", "region"], [], ["loc", [null, [16, 10], [16, 39]]]], ["inline", "order-display", [], ["target", "region", "current", ["subexpr", "@mut", [["get", "sortedByProperty", ["loc", [null, [18, 48], [18, 64]]]]], [], []], "type", ["subexpr", "@mut", [["get", "sortedBy", ["loc", [null, [18, 70], [18, 78]]]]], [], []]], ["loc", [null, [18, 8], [18, 80]]]], ["block", "each", [["get", "championsSorted", ["loc", [null, [23, 12], [23, 27]]]]], [], 0, null, ["loc", [null, [23, 4], [33, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('frontend/components/order-display/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    isActive: _ember['default'].computed('target', 'current', function () {
      return this.get('target') === this.get('current');
    }),

    desc: _ember['default'].computed('type', function () {
      return this.get('type') === 'desc';
    })
  });
});
define("frontend/components/order-display/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "frontend/components/order-display/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "glyphicon glyphicon-chevron-down");
            dom.setAttribute(el1, "aria-hidden", "true");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "frontend/components/order-display/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "glyphicon glyphicon-chevron-up");
            dom.setAttribute(el1, "aria-hidden", "true");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "frontend/components/order-display/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "desc", ["loc", [null, [2, 8], [2, 12]]]]], [], 0, 1, ["loc", [null, [2, 2], [6, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "frontend/components/order-display/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment(" Stop bouncing around of table columns ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "glyphicon glyphicon-chevron-up");
          dom.setAttribute(el1, "style", "visibility: hidden");
          dom.setAttribute(el1, "aria-hidden", "true");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "frontend/components/order-display/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "isActive", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [10, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('frontend/components/search-container/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    championData: null,

    propertyObserver: _ember['default'].on('init', _ember['default'].observer('name', 'region', function () {
      var _this = this;

      var url = '/api/search/' + this.get('region').toLowerCase() + '/' + this.get('name').toLowerCase();

      _ember['default'].$.ajax({ url: url }).then(function (response) {
        _this.set('championData', response);
      });
    }))

  });
});
define("frontend/components/search-container/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 45,
              "column": 2
            }
          },
          "moduleName": "frontend/components/search-container/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "champion-row");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "icon-column");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "champion-name-text");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "my-score-column");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h1");
          var el4 = dom.createTextNode("Score");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "my-score-divider");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h1");
          dom.setAttribute(el3, "class", "my-score-text");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "champion-rank-column");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "rank-row");
          var el4 = dom.createTextNode("\n        Rank : \n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "rank-special-text");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode(" / \n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "rank-row");
          var el4 = dom.createTextNode("\n        Top ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" : \n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "score-special-text");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "style", "display: flex; flex-direction: column; margin-left: 10px; margin-right: 10px; flex: 2 2; align-items: center;");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "rank-row");
          var el4 = dom.createTextNode("\n        Overall Rank :\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "rank-special-text");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode(" / \n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "rank-row");
          var el4 = dom.createTextNode("\n        Top Overall : \n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("span");
          dom.setAttribute(el4, "class", "score-special-text");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [5]);
          var element3 = dom.childAt(element2, [1, 1]);
          var element4 = dom.childAt(element2, [3]);
          var element5 = dom.childAt(element0, [7]);
          var element6 = dom.childAt(element5, [1, 1]);
          var morphs = new Array(10);
          morphs[0] = dom.createMorphAt(element1, 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [3, 5]), 0, 0);
          morphs[3] = dom.createMorphAt(element3, 1, 1);
          morphs[4] = dom.createMorphAt(element3, 3, 3);
          morphs[5] = dom.createMorphAt(element4, 1, 1);
          morphs[6] = dom.createMorphAt(dom.childAt(element4, [3]), 1, 1);
          morphs[7] = dom.createMorphAt(element6, 1, 1);
          morphs[8] = dom.createMorphAt(element6, 3, 3);
          morphs[9] = dom.createMorphAt(dom.childAt(element5, [3, 1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "champion-image", [], ["championId", ["subexpr", "@mut", [["get", "champion.champion_id", ["loc", [null, [6, 34], [6, 54]]]]], [], []], "size", "large"], ["loc", [null, [6, 6], [6, 69]]]], ["inline", "champion-name", [], ["championId", ["subexpr", "@mut", [["get", "champion.champion_id", ["loc", [null, [7, 65], [7, 85]]]]], [], []]], ["loc", [null, [7, 38], [7, 87]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "champion.points", ["loc", [null, [12, 55], [12, 70]]]]], [], []]], ["loc", [null, [12, 32], [12, 72]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "champion.champion_rank", ["loc", [null, [18, 33], [18, 55]]]]], [], []], "short", true], ["loc", [null, [18, 10], [18, 68]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "champion.max_champion_rank", ["loc", [null, [19, 33], [19, 59]]]]], [], []], "short", true], ["loc", [null, [19, 10], [19, 72]]]], ["inline", "champion-name", [], ["championId", ["subexpr", "@mut", [["get", "champion.champion_id", ["loc", [null, [23, 39], [23, 59]]]]], [], []]], ["loc", [null, [23, 12], [23, 61]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "champion.max_champion_points", ["loc", [null, [25, 33], [25, 61]]]]], [], []]], ["loc", [null, [25, 10], [25, 63]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "champion.overall_rank", ["loc", [null, [33, 33], [33, 54]]]]], [], []], "short", true], ["loc", [null, [33, 10], [33, 67]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "champion.max_overall_rank", ["loc", [null, [34, 33], [34, 58]]]]], [], []], "short", true], ["loc", [null, [34, 10], [34, 71]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "champion.max_overall_points", ["loc", [null, [40, 33], [40, 60]]]]], [], []]], ["loc", [null, [40, 10], [40, 62]]]]],
        locals: ["champion"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 49,
            "column": 0
          }
        },
        "moduleName": "frontend/components/search-container/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "championData", ["loc", [null, [3, 10], [3, 22]]]]], [], 0, null, ["loc", [null, [3, 2], [45, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/constants/champions", ["exports"], function (exports) {
   exports["default"] = {
      266: {
         "title": "the Darkin Blade",
         "name": "Aatrox",
         "image": {
            "w": 48,
            "full": "Aatrox.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 0
         },
         "key": "Aatrox"
      },
      412: {
         "title": "the Chain Warden",
         "name": "Thresh",
         "image": {
            "w": 48,
            "full": "Thresh.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 336
         },
         "key": "Thresh"
      },
      23: {
         "title": "the Barbarian King",
         "name": "Tryndamere",
         "image": {
            "w": 48,
            "full": "Tryndamere.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 0
         },
         "key": "Tryndamere"
      },
      79: {
         "title": "the Rabble Rouser",
         "name": "Gragas",
         "image": {
            "w": 48,
            "full": "Gragas.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 0
         },
         "key": "Gragas"
      },
      136: {
         "title": "The Star Forger",
         "name": "Aurelion Sol",
         "image": {
            "w": 48,
            "full": "AurelionSol.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 432
         },
         "key": "AurelionSol"
      },
      69: {
         "title": "the Serpent's Embrace",
         "name": "Cassiopeia",
         "image": {
            "w": 48,
            "full": "Cassiopeia.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 144
         },
         "key": "Cassiopeia"
      },
      78: {
         "title": "Keeper of the Hammer",
         "name": "Poppy",
         "image": {
            "w": 48,
            "full": "Poppy.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 144
         },
         "key": "Poppy"
      },
      13: {
         "title": "the Rogue Mage",
         "name": "Ryze",
         "image": {
            "w": 48,
            "full": "Ryze.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 48
         },
         "key": "Ryze"
      },
      14: {
         "title": "The Undead Juggernaut",
         "name": "Sion",
         "image": {
            "w": 48,
            "full": "Sion.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 336
         },
         "key": "Sion"
      },
      1: { "title": "the Dark Child",
         "name": "Annie",
         "image": {
            "w": 48,
            "full": "Annie.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 288
         },
         "key": "Annie"
      },
      202: {
         "title": "the Virtuoso",
         "name": "Jhin",
         "image": {
            "w": 48,
            "full": "Jhin.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 384
         },
         "key": "Jhin"
      },
      111: {
         "title": "the Titan of the Depths",
         "name": "Nautilus",
         "image": {
            "w": 48,
            "full": "Nautilus.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 288
         },
         "key": "Nautilus"
      },
      43: {
         "title": "the Enlightened One",
         "name": "Karma",
         "image": {
            "w": 48,
            "full": "Karma.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 48
         },
         "key": "Karma"
      },
      99: {
         "title": "the Lady of Luminosity",
         "name": "Lux",
         "image": {
            "w": 48,
            "full": "Lux.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 240
         },
         "key": "Lux"
      },
      103: {
         "title": "the Nine-Tailed Fox",
         "name": "Ahri",
         "image": {
            "w": 48,
            "full": "Ahri.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 48
         },
         "key": "Ahri"
      },
      2: { "title": "the Berserker",
         "name": "Olaf",
         "image": {
            "w": 48,
            "full": "Olaf.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 0
         },
         "key": "Olaf"
      },
      112: {
         "title": "the Machine Herald",
         "name": "Viktor",
         "image": {
            "w": 48,
            "full": "Viktor.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 0
         },
         "key": "Viktor"
      },
      27: {
         "title": "the Mad Chemist",
         "name": "Singed",
         "image": {
            "w": 48,
            "full": "Singed.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 288
         },
         "key": "Singed"
      },
      86: {
         "title": "The Might of Demacia",
         "name": "Garen",
         "image": {
            "w": 48,
            "full": "Garen.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 384
         },
         "key": "Garen"
      },
      34: {
         "title": "the Cryophoenix",
         "name": "Anivia",
         "image": {
            "w": 48,
            "full": "Anivia.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 240
         },
         "key": "Anivia"
      },
      57: {
         "title": "the Twisted Treant",
         "name": "Maokai",
         "image": {
            "w": 48,
            "full": "Maokai.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 384
         },
         "key": "Maokai"
      },
      127: {
         "title": "the Ice Witch",
         "name": "Lissandra",
         "image": {
            "w": 48,
            "full": "Lissandra.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 96
         },
         "key": "Lissandra"
      },
      25: {
         "title": "Fallen Angel",
         "name": "Morgana",
         "image": {
            "w": 48,
            "full": "Morgana.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 144
         },
         "key": "Morgana"
      },
      28: {
         "title": "the Widowmaker",
         "name": "Evelynn",
         "image": {
            "w": 48,
            "full": "Evelynn.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 48
         },
         "key": "Evelynn"
      },
      105: {
         "title": "the Tidal Trickster",
         "name": "Fizz",
         "image": {
            "w": 48,
            "full": "Fizz.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 240
         },
         "key": "Fizz"
      },
      74: {
         "title": "the Revered Inventor",
         "name": "Heimerdinger",
         "image": {
            "w": 48,
            "full": "Heimerdinger.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 144
         },
         "key": "Heimerdinger"
      },
      238: {
         "title": "the Master of Shadows",
         "name": "Zed",
         "image": {
            "w": 48,
            "full": "Zed.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 432
         },
         "key": "Zed"
      },
      68: {
         "title": "the Mechanized Menace",
         "name": "Rumble",
         "image": {
            "w": 48,
            "full": "Rumble.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 0
         },
         "key": "Rumble"
      },
      82: {
         "title": "the Iron Revenant",
         "name": "Mordekaiser",
         "image": {
            "w": 48,
            "full": "Mordekaiser.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 96
         },
         "key": "Mordekaiser"
      },
      37: {
         "title": "Maven of the Strings",
         "name": "Sona",
         "image": {
            "w": 48,
            "full": "Sona.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 0
         },
         "key": "Sona"
      },
      55: {
         "title": "the Sinister Blade",
         "name": "Katarina",
         "image": {
            "w": 48,
            "full": "Katarina.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 192
         },
         "key": "Katarina"
      },
      96: {
         "title": "the Mouth of the Abyss",
         "name": "Kog'Maw",
         "image": {
            "w": 48,
            "full": "KogMaw.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 384
         },
         "key": "KogMaw"
      },
      22: {
         "title": "the Frost Archer",
         "name": "Ashe",
         "image": {
            "w": 48,
            "full": "Ashe.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 336
         },
         "key": "Ashe"
      },
      117: {
         "title": "the Fae Sorceress",
         "name": "Lulu",
         "image": {
            "w": 48,
            "full": "Lulu.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 192
         },
         "key": "Lulu"
      },
      30: {
         "title": "the Deathsinger",
         "name": "Karthus",
         "image": {
            "w": 48,
            "full": "Karthus.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 96
         },
         "key": "Karthus"
      },
      12: {
         "title": "the Minotaur",
         "name": "Alistar",
         "image": {
            "w": 48,
            "full": "Alistar.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 144
         },
         "key": "Alistar"
      },
      122: {
         "title": "the Hand of Noxus",
         "name": "Darius",
         "image": {
            "w": 48,
            "full": "Darius.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 288
         },
         "key": "Darius"
      },
      67: {
         "title": "the Night Hunter",
         "name": "Vayne",
         "image": {
            "w": 48,
            "full": "Vayne.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 288
         },
         "key": "Vayne"
      },
      77: {
         "title": "the Spirit Walker",
         "name": "Udyr",
         "image": {
            "w": 48,
            "full": "Udyr.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 144
         },
         "key": "Udyr"
      },
      110: {
         "title": "the Arrow of Retribution",
         "name": "Varus",
         "image": {
            "w": 48,
            "full": "Varus.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 240
         },
         "key": "Varus"
      },
      126: {
         "title": "the Defender of Tomorrow",
         "name": "Jayce",
         "image": {
            "w": 48,
            "full": "Jayce.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 384
         },
         "key": "Jayce"
      },
      89: {
         "title": "the Radiant Dawn",
         "name": "Leona",
         "image": {
            "w": 48,
            "full": "Leona.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 48
         },
         "key": "Leona"
      },
      134: {
         "title": "the Dark Sovereign",
         "name": "Syndra",
         "image": {
            "w": 48,
            "full": "Syndra.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 144
         },
         "key": "Syndra"
      },
      80: {
         "title": "the Artisan of War",
         "name": "Pantheon",
         "image": {
            "w": 48,
            "full": "Pantheon.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 96
         },
         "key": "Pantheon"
      },
      121: {
         "title": "the Voidreaver",
         "name": "Kha'Zix",
         "image": {
            "w": 48,
            "full": "Khazix.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 336
         },
         "key": "Khazix"
      },
      92: {
         "title": "the Exile",
         "name": "Riven",
         "image": {
            "w": 48,
            "full": "Riven.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 432
         },
         "key": "Riven"
      },
      42: {
         "title": "the Daring Bombardier",
         "name": "Corki",
         "image": {
            "w": 48,
            "full": "Corki.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 240
         },
         "key": "Corki"
      },
      51: {
         "title": "the Sheriff of Piltover",
         "name": "Caitlyn",
         "image": {
            "w": 48,
            "full": "Caitlyn.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 96
         },
         "key": "Caitlyn"
      },
      268: {
         "title": "the Emperor of the Sands",
         "name": "Azir",
         "image": {
            "w": 48,
            "full": "Azir.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 384
         },
         "key": "Azir"
      },
      76: {
         "title": "the Bestial Huntress",
         "name": "Nidalee",
         "image": {
            "w": 48,
            "full": "Nidalee.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 336
         },
         "key": "Nidalee"
      },
      85: {
         "title": "the Heart of the Tempest",
         "name": "Kennen",
         "image": {
            "w": 48,
            "full": "Kennen.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 288
         },
         "key": "Kennen"
      },
      3: { "title": "the Sentinel's Sorrow",
         "name": "Galio",
         "image": {
            "w": 48,
            "full": "Galio.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 288
         },
         "key": "Galio"
      },
      45: {
         "title": "the Tiny Master of Evil",
         "name": "Veigar",
         "image": {
            "w": 48,
            "full": "Veigar.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 336
         },
         "key": "Veigar"
      },
      432: {
         "title": "the Wandering Caretaker",
         "name": "Bard",
         "image": {
            "w": 48,
            "full": "Bard.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 144
         },
         "key": "Bard"
      },
      150: {
         "title": "the Missing Link",
         "name": "Gnar",
         "image": {
            "w": 48,
            "full": "Gnar.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 432
         },
         "key": "Gnar"
      },
      90: {
         "title": "the Prophet of the Void",
         "name": "Malzahar",
         "image": {
            "w": 48,
            "full": "Malzahar.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 336
         },
         "key": "Malzahar"
      },
      104: {
         "title": "the Outlaw",
         "name": "Graves",
         "image": {
            "w": 48,
            "full": "Graves.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 48
         },
         "key": "Graves"
      },
      254: {
         "title": "the Piltover Enforcer",
         "name": "Vi",
         "image": {
            "w": 48,
            "full": "Vi.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 432
         },
         "key": "Vi"
      },
      10: {
         "title": "The Judicator",
         "name": "Kayle",
         "image": {
            "w": 48,
            "full": "Kayle.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 240
         },
         "key": "Kayle"
      },
      39: {
         "title": "the Will of the Blades",
         "name": "Irelia",
         "image": {
            "w": 48,
            "full": "Irelia.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 192
         },
         "key": "Irelia"
      },
      64: {
         "title": "the Blind Monk",
         "name": "Lee Sin",
         "image": {
            "w": 48,
            "full": "LeeSin.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 0
         },
         "key": "LeeSin"
      },
      420: {
         "title": "the Kraken Priestess",
         "name": "Illaoi",
         "image": {
            "w": 48,
            "full": "Illaoi.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 336
         },
         "key": "Illaoi"
      },
      60: {
         "title": "the Spider Queen",
         "name": "Elise",
         "image": {
            "w": 48,
            "full": "Elise.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 0
         },
         "key": "Elise"
      },
      106: {
         "title": "the Thunder's Roar",
         "name": "Volibear",
         "image": {
            "w": 48,
            "full": "Volibear.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 96
         },
         "key": "Volibear"
      },
      20: {
         "title": "the Yeti Rider",
         "name": "Nunu",
         "image": {
            "w": 48,
            "full": "Nunu.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 432
         },
         "key": "Nunu"
      },
      4: { "title": "the Card Master",
         "name": "Twisted Fate",
         "image": {
            "w": 48,
            "full": "TwistedFate.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 48
         },
         "key": "TwistedFate"
      },
      24: {
         "title": "Grandmaster at Arms",
         "name": "Jax",
         "image": {
            "w": 48,
            "full": "Jax.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 336
         },
         "key": "Jax"
      },
      102: {
         "title": "the Half-Dragon",
         "name": "Shyvana",
         "image": {
            "w": 48,
            "full": "Shyvana.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 240
         },
         "key": "Shyvana"
      },
      429: {
         "title": "the Spear of Vengeance",
         "name": "Kalista",
         "image": {
            "w": 48,
            "full": "Kalista.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 0
         },
         "key": "Kalista"
      },
      36: {
         "title": "the Madman of Zaun",
         "name": "Dr. Mundo",
         "image": {
            "w": 48,
            "full": "DrMundo.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 432
         },
         "key": "DrMundo"
      },
      223: {
         "title": "the River King",
         "name": "Tahm Kench",
         "image": {
            "w": 48,
            "full": "TahmKench.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 240
         },
         "key": "TahmKench"
      },
      131: {
         "title": "Scorn of the Moon",
         "name": "Diana",
         "image": {
            "w": 48,
            "full": "Diana.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 336
         },
         "key": "Diana"
      },
      63: {
         "title": "the Burning Vengeance",
         "name": "Brand",
         "image": {
            "w": 48,
            "full": "Brand.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 0
         },
         "key": "Brand"
      },
      113: {
         "title": "the Winter's Wrath",
         "name": "Sejuani",
         "image": {
            "w": 48,
            "full": "Sejuani.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 96
         },
         "key": "Sejuani"
      },
      8: { "title": "the Crimson Reaper",
         "name": "Vladimir",
         "image": {
            "w": 48,
            "full": "Vladimir.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 48
         },
         "key": "Vladimir"
      },
      154: {
         "title": "the Secret Weapon",
         "name": "Zac",
         "image": {
            "w": 48,
            "full": "Zac.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 384
         },
         "key": "Zac"
      },
      421: {
         "title": "the Void Burrower",
         "name": "Rek'Sai",
         "image": {
            "w": 48,
            "full": "RekSai.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 288
         },
         "key": "RekSai"
      },
      133: {
         "title": "Demacia's Wings",
         "name": "Quinn",
         "image": {
            "w": 48,
            "full": "Quinn.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 192
         },
         "key": "Quinn"
      },
      84: {
         "title": "the Fist of Shadow",
         "name": "Akali",
         "image": {
            "w": 48,
            "full": "Akali.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 96
         },
         "key": "Akali"
      },
      18: {
         "title": "the Yordle Gunner",
         "name": "Tristana",
         "image": {
            "w": 48,
            "full": "Tristana.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 384
         },
         "key": "Tristana"
      },
      120: {
         "title": "the Shadow of War",
         "name": "Hecarim",
         "image": {
            "w": 48,
            "full": "Hecarim.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 96
         },
         "key": "Hecarim"
      },
      15: {
         "title": "the Battle Mistress",
         "name": "Sivir",
         "image": {
            "w": 48,
            "full": "Sivir.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 384
         },
         "key": "Sivir"
      },
      236: {
         "title": "the Purifier",
         "name": "Lucian",
         "image": {
            "w": 48,
            "full": "Lucian.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 144
         },
         "key": "Lucian"
      },
      107: {
         "title": "the Pridestalker",
         "name": "Rengar",
         "image": {
            "w": 48,
            "full": "Rengar.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 384
         },
         "key": "Rengar"
      },
      19: {
         "title": "the Blood Hunter",
         "name": "Warwick",
         "image": {
            "w": 48,
            "full": "Warwick.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 144
         },
         "key": "Warwick"
      },
      72: {
         "title": "the Crystal Vanguard",
         "name": "Skarner",
         "image": {
            "w": 48,
            "full": "Skarner.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 432
         },
         "key": "Skarner"
      },
      54: {
         "title": "Shard of the Monolith",
         "name": "Malphite",
         "image": {
            "w": 48,
            "full": "Malphite.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 288
         },
         "key": "Malphite"
      },
      157: {
         "title": "the Unforgiven",
         "name": "Yasuo",
         "image": {
            "w": 48,
            "full": "Yasuo.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 288
         },
         "key": "Yasuo"
      },
      101: {
         "title": "the Magus Ascendant",
         "name": "Xerath",
         "image": {
            "w": 48,
            "full": "Xerath.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 192
         },
         "key": "Xerath"
      },
      17: {
         "title": "the Swift Scout",
         "name": "Teemo",
         "image": {
            "w": 48,
            "full": "Teemo.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 288
         },
         "key": "Teemo"
      },
      58: {
         "title": "the Butcher of the Sands",
         "name": "Renekton",
         "image": {
            "w": 48,
            "full": "Renekton.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 336
         },
         "key": "Renekton"
      },
      75: {
         "title": "the Curator of the Sands",
         "name": "Nasus",
         "image": {
            "w": 48,
            "full": "Nasus.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 240
         },
         "key": "Nasus"
      },
      119: {
         "title": "the Glorious Executioner",
         "name": "Draven",
         "image": {
            "w": 48,
            "full": "Draven.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 384
         },
         "key": "Draven"
      },
      35: {
         "title": "the Demon Jester",
         "name": "Shaco",
         "image": {
            "w": 48,
            "full": "Shaco.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 144
         },
         "key": "Shaco"
      },
      50: {
         "title": "the Master Tactician",
         "name": "Swain",
         "image": {
            "w": 48,
            "full": "Swain.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 96
         },
         "key": "Swain"
      },
      40: {
         "title": "the Storm's Fury",
         "name": "Janna",
         "image": {
            "w": 48,
            "full": "Janna.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 240
         },
         "key": "Janna"
      },
      91: {
         "title": "the Blade's Shadow",
         "name": "Talon",
         "image": {
            "w": 48,
            "full": "Talon.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 192
         },
         "key": "Talon"
      },
      115: {
         "title": "the Hexplosives Expert",
         "name": "Ziggs",
         "image": {
            "w": 48,
            "full": "Ziggs.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 0
         },
         "key": "Ziggs"
      },
      245: {
         "title": "the Boy Who Shattered Time",
         "name": "Ekko",
         "image": {
            "w": 48,
            "full": "Ekko.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 192
         },
         "key": "Ekko"
      },
      61: {
         "title": "the Lady of Clockwork",
         "name": "Orianna",
         "image": {
            "w": 48,
            "full": "Orianna.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 48
         },
         "key": "Orianna"
      },
      9: { "title": "the Harbinger of Doom",
         "name": "Fiddlesticks",
         "image": {
            "w": 48,
            "full": "FiddleSticks.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 144
         },
         "key": "FiddleSticks"
      },
      114: {
         "title": "the Grand Duelist",
         "name": "Fiora",
         "image": {
            "w": 48,
            "full": "Fiora.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 192
         },
         "key": "Fiora"
      },
      31: {
         "title": "the Terror of the Void",
         "name": "Cho'Gath",
         "image": {
            "w": 48,
            "full": "Chogath.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 192
         },
         "key": "Chogath"
      },
      33: {
         "title": "the Armordillo",
         "name": "Rammus",
         "image": {
            "w": 48,
            "full": "Rammus.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 240
         },
         "key": "Rammus"
      },
      7: {
         "title": "the Deceiver",
         "name": "LeBlanc",
         "image": {
            "w": 48,
            "full": "Leblanc.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 432
         },
         "key": "Leblanc"
      },
      16: {
         "title": "the Starchild",
         "name": "Soraka",
         "image": {
            "w": 48,
            "full": "Soraka.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 48
         },
         "key": "Soraka"
      },
      26: {
         "title": "the Chronokeeper",
         "name": "Zilean",
         "image": {
            "w": 48,
            "full": "Zilean.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 48
         },
         "key": "Zilean"
      },
      56: {
         "title": "the Eternal Nightmare",
         "name": "Nocturne",
         "image": {
            "w": 48,
            "full": "Nocturne.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 384
         },
         "key": "Nocturne"
      },
      222: {
         "title": "the Loose Cannon",
         "name": "Jinx",
         "image": {
            "w": 48,
            "full": "Jinx.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 432
         },
         "key": "Jinx"
      },
      83: {
         "title": "the Gravedigger",
         "name": "Yorick",
         "image": {
            "w": 48,
            "full": "Yorick.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 336
         },
         "key": "Yorick"
      },
      6: { "title": "the Headsman's Pride",
         "name": "Urgot",
         "image": {
            "w": 48,
            "full": "Urgot.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 192
         },
         "key": "Urgot"
      },
      203: {
         "title": "The Eternal Hunters",
         "name": "Kindred",
         "image": {
            "w": 48,
            "full": "Kindred.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 288
         },
         "key": "Kindred"
      },
      21: {
         "title": "the Bounty Hunter",
         "name": "Miss Fortune",
         "image": {
            "w": 48,
            "full": "MissFortune.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 0
         },
         "key": "MissFortune"
      },
      62: {
         "title": "the Monkey King",
         "name": "Wukong",
         "image": {
            "w": 48,
            "full": "MonkeyKing.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 48
         },
         "key": "MonkeyKing"
      },
      53: {
         "title": "the Great Steam Golem",
         "name": "Blitzcrank",
         "image": {
            "w": 48,
            "full": "Blitzcrank.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 432
         },
         "key": "Blitzcrank"
      },
      98: {
         "title": "the Eye of Twilight",
         "name": "Shen",
         "image": {
            "w": 48,
            "full": "Shen.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 192
         },
         "key": "Shen"
      },
      201: {
         "title": "the Heart of the Freljord",
         "name": "Braum",
         "image": {
            "w": 48,
            "full": "Braum.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 48
         },
         "key": "Braum"
      },
      5: { "title": "the Seneschal of Demacia",
         "name": "Xin Zhao",
         "image": {
            "w": 48,
            "full": "XinZhao.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 240
         },
         "key": "XinZhao"
      },
      29: {
         "title": "the Plague Rat",
         "name": "Twitch",
         "image": {
            "w": 48,
            "full": "Twitch.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 96
         },
         "key": "Twitch"
      },
      11: {
         "title": "the Wuju Bladesman",
         "name": "Master Yi",
         "image": {
            "w": 48,
            "full": "MasterYi.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 432
         },
         "key": "MasterYi"
      },
      44: {
         "title": "the Shield of Valoran",
         "name": "Taric",
         "image": {
            "w": 48,
            "full": "Taric.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 240
         },
         "key": "Taric"
      },
      32: {
         "title": "the Sad Mummy",
         "name": "Amumu",
         "image": {
            "w": 48,
            "full": "Amumu.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 192
         },
         "key": "Amumu"
      },
      41: {
         "title": "the Saltwater Scourge",
         "name": "Gangplank",
         "image": {
            "w": 48,
            "full": "Gangplank.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 336
         },
         "key": "Gangplank"
      },
      48: {
         "title": "the Troll King",
         "name": "Trundle",
         "image": {
            "w": 48,
            "full": "Trundle.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 432
         },
         "key": "Trundle"
      },
      38: {
         "title": "the Void Walker",
         "name": "Kassadin",
         "image": {
            "w": 48,
            "full": "Kassadin.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 144
         },
         "key": "Kassadin"
      },
      161: {
         "title": "the Eye of the Void",
         "name": "Vel'Koz",
         "image": {
            "w": 48,
            "full": "Velkoz.png",
            "sprite": "champion3.png",
            "group": "champion",
            "h": 48,
            "y": 48,
            "x": 384
         },
         "key": "Velkoz"
      },
      143: {
         "title": "Rise of the Thorns",
         "name": "Zyra",
         "image": {
            "w": 48,
            "full": "Zyra.png",
            "sprite": "champion4.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 96
         },
         "key": "Zyra"
      },
      267: {
         "title": "the Tidecaller",
         "name": "Nami",
         "image": {
            "w": 48,
            "full": "Nami.png",
            "sprite": "champion2.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 192
         },
         "key": "Nami"
      },
      59: {
         "title": "the Exemplar of Demacia",
         "name": "Jarvan IV",
         "image": {
            "w": 48,
            "full": "JarvanIV.png",
            "sprite": "champion1.png",
            "group": "champion",
            "h": 48,
            "y": 0,
            "x": 288
         },
         "key": "JarvanIV"
      },
      81: {
         "title": "the Prodigal Explorer",
         "name": "Ezreal",
         "image": {
            "w": 48,
            "full": "Ezreal.png",
            "sprite": "champion0.png",
            "group": "champion",
            "h": 48,
            "y": 96,
            "x": 96
         },
         "key": "Ezreal"
      }
   };
});
define('frontend/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    classNames: ['application']
  });
});
define('frontend/controllers/scans', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    init: function init() {
      _ember['default'].run.scheduleOnce('afterRender', this, function () {
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        });
      });
    },

    scans: null,

    sortRegionAsc: ['region'],

    sortedComputedScans: _ember['default'].computed.sort('computedScans', 'sortRegionAsc'),

    computedScans: _ember['default'].computed('scans', function () {
      var scans = this.get('scans');

      if (!scans) return;

      return scans.map(function (scan) {
        scan.progressPercent = ((scan.current_id - scan.start_id) / scan.end_id * 100).toFixed(2);
        scan.scanned = scan.current_id - scan.start_id;
        return scan;
      });
    }),

    initScans: _ember['default'].on('init', function () {
      this.fetchScans();
    }),

    fetchScans: function fetchScans() {
      var _this = this;

      _ember['default'].$.ajax({
        url: '/api/scans'
      }).then(function (response) {
        _this.set('scans', response);
      });
    }

  });
});
define('frontend/controllers/search', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    name: null,

    region: null,

    queryParams: ['name', 'region']

  });
});
define('frontend/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('frontend/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'frontend/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _frontendConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_frontendConfigEnvironment['default'].APP.name, _frontendConfigEnvironment['default'].APP.version)
  };
});
define('frontend/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('frontend/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('frontend/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('frontend/initializers/export-application-global', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_frontendConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _frontendConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_frontendConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('frontend/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('frontend/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('frontend/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("frontend/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('frontend/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _frontendConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('leaderboard');
    this.route('scans');
    this.route('home', { path: '/' });
    this.route('search', { path: '/search' });
  });

  exports['default'] = Router;
});
define('frontend/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("frontend/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 12
            },
            "end": {
              "line": 18,
              "column": 49
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Leaderboard");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 12
            },
            "end": {
              "line": 19,
              "column": 37
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Scans");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "class", "navbar navbar-default");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Brand and toggle get grouped for better mobile display ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "navbar-header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "button");
        dom.setAttribute(el4, "class", "navbar-toggle collapsed");
        dom.setAttribute(el4, "data-toggle", "collapse");
        dom.setAttribute(el4, "data-target", "#bs-example-navbar-collapse-1");
        dom.setAttribute(el4, "aria-expanded", "false");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "sr-only");
        var el6 = dom.createTextNode("Toggle navigation");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "navbar-brand");
        dom.setAttribute(el4, "href", "#");
        var el5 = dom.createTextNode("MasterYi");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Collect the nav links, forms, and other content for toggling ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "collapse navbar-collapse");
        dom.setAttribute(el3, "id", "bs-example-navbar-collapse-1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "nav navbar-nav");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5, "class", "active");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "href", "#");
        var el7 = dom.createTextNode("Home");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "sr-only");
        var el8 = dom.createTextNode("(current)");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" /.navbar-collapse ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" /.container-fluid ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 7, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["leaderboard"], [], 0, null, ["loc", [null, [18, 12], [18, 61]]]], ["block", "link-to", ["scans"], [], 1, null, ["loc", [null, [19, 12], [19, 49]]]], ["content", "outlet", ["loc", [null, [25, 0], [25, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("frontend/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/home.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "home-container", ["loc", [null, [1, 0], [1, 18]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/leaderboard", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/leaderboard.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container content-container");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Leaderboard");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 3, 3);
        return morphs;
      },
      statements: [["content", "leaderboard-overall", ["loc", [null, [5, 2], [5, 25]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/scans", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 6
            },
            "end": {
              "line": 31,
              "column": 6
            }
          },
          "moduleName": "frontend/templates/scans.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" \n          / \n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" \n          (");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("%)\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [5]);
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(element1, 1, 1);
          morphs[3] = dom.createMorphAt(element1, 3, 3);
          morphs[4] = dom.createMorphAt(element1, 5, 5);
          return morphs;
        },
        statements: [["content", "scan.region", ["loc", [null, [22, 12], [22, 27]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "scan.players", ["loc", [null, [23, 35], [23, 47]]]]], [], []]], ["loc", [null, [23, 12], [23, 49]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "scan.current_id", ["loc", [null, [25, 33], [25, 48]]]]], [], []]], ["loc", [null, [25, 10], [25, 50]]]], ["inline", "format-number", [], ["number", ["subexpr", "@mut", [["get", "scan.end_id", ["loc", [null, [27, 33], [27, 44]]]]], [], []]], ["loc", [null, [27, 10], [27, 46]]]], ["content", "scan.progressPercent", ["loc", [null, [28, 11], [28, 35]]]]],
        locals: ["scan"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/scans.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container content-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Scans");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        dom.setAttribute(el2, "class", "table");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("thead");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("th");
        var el6 = dom.createTextNode("Region");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("th");
        var el6 = dom.createTextNode("\n          Players Found \n          ( ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "data-toggle", "tooltip");
        dom.setAttribute(el6, "data-placement", "top");
        dom.setAttribute(el6, "title", "Players who have atleast mastery level 5 with one champion");
        dom.setAttribute(el6, "style", "text-decoration: underline");
        var el7 = dom.createTextNode("?");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          )\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("th");
        var el6 = dom.createTextNode("Progress");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tbody");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3, 3]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "sortedComputedScans", ["loc", [null, [20, 14], [20, 33]]]]], [], 0, null, ["loc", [null, [20, 6], [31, 15]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/search.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "search-container", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [2, 7], [2, 11]]]]], [], []], "region", ["subexpr", "@mut", [["get", "region", ["loc", [null, [3, 9], [3, 15]]]]], [], []]], ["loc", [null, [1, 0], [3, 17]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('frontend/config/environment', ['ember'], function(Ember) {
  var prefix = 'frontend';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+ac62178d"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map