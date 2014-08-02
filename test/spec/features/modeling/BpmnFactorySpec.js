'use strict';

var Matchers = require('../../../Matchers'),
    TestHelper = require('../../../TestHelper');

/* global bootstrapBpmnJS, inject */


var fs = require('fs');

var modelingModule = require('../../../../lib/features/modeling');


describe('features - bpmn-factory', function() {

  beforeEach(Matchers.addDeepEquals);


  var diagramXML = fs.readFileSync('test/fixtures/bpmn/simple.bpmn', 'utf-8');

  var testModules = [ modelingModule ];

  beforeEach(bootstrapBpmnJS(diagramXML, { modules: testModules }));


  describe('create di', function() {

    it('should create waypoints', inject(function(bpmnFactory) {

      // given
      var waypoints = [
        { original: { x: 0, y: 0 }, x: 0, y: 0 },
        { original: { x: 0, y: 0 }, x: 0, y: 0 }
      ];

      // when
      var result = bpmnFactory.createDiWaypoints(waypoints);

      // then
      expect(result).toDeepEqual([
        { $type: 'dc:Point', x: 0, y: 0 },
        { $type: 'dc:Point', x: 0, y: 0 }
      ]);

      // expect original not to have been accidently serialized
      expect(result[0].$attrs).toEqual({});
    }));


  });

});