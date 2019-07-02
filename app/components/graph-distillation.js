import { computed } from '@ember/object';

import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import { line } from 'd3-shape';
import { circle } from 'd3-geo';

import LineChart from './line-chart';


export default LineChart.extend({
  data: null,

  initData() {
    let cuts = this.oil.cuts;
    //cuts.map((c) => ([c.fraction.value, c.vapor_temp.value]));

    this.set('data', [{
       name: 'Cuts',
       values: cuts.map((c) => ([c.vapor_temp.value, c.fraction.value])),
       color: 'red'
     }]);
  },

  xScale: computed('data.[]', 'chartWidth', function() {
    var data = this.get('data');
    var width = this.get('chartWidth');

    var xValues = data[0].values.map((v) => (v[0]));
    var minMax = extent(xValues);

    return scaleLinear()
      .domain(minMax)
      .range([0, width]);
  }),

  yScale: computed('data.[]', 'chartHeight', function() {
    var data = this.get('data');
    var height = this.get('chartHeight');

    var yValues = data[0].values.map((v) => (v[1]));
    var minMax = extent(yValues);

    return scaleLinear()
      .domain(minMax)
      .range([height, 0]);
  }),

  createXAxisElement: function() {
    let svg = this.get('chartSVG');
    var scale = this.get('xScale');
    var height = this.get('chartHeight');
    var width = this.get('chartWidth');

    var xAxis = axisBottom(scale)
      .tickFormat(format('.1f'))
      .tickSizeInner(4)
      .tickSizeOuter(0);

    svg.insert('g', ':first-child')
      .attr('class', 'chart__axis chart__axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    svg.selectAll('.chart__axis--x')
      .append("text")
      .attr("x", width / 2.0)
      .attr("y", 35)
      .attr("dy", ".5em")
      .attr("fill", "currentColor")
      .style("text-anchor", "end")
      .text("Vapor Temperature");
  },

  createYAxisElement: function() {
    var svg = this.get('chartSVG');
    var scale = this.get('yScale');
    var height = this.get('chartHeight');
    var ticks = 6;

    var minMax = scale.domain();
    var diff = minMax[1] - minMax[0];
    var steps = diff / (ticks - 1);

    var tickValues = [];
    for (var i = 0; i < ticks; i++) {
      tickValues.push(minMax[0] + steps * i);
    }

    var yAxis = axisLeft(scale)
      .tickValues(tickValues)
      .tickFormat(format('.1f'))
      .tickSizeInner(6)
      .tickSizeOuter(6);

    svg.insert('g', ':first-child')
      .attr('class', 'chart__axis chart__axis--y')
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2.0)
      .attr("y", -30)
      .attr("dy", ".5em")
      .attr("fill", "currentColor")
      .style("text-anchor", "end")
      .text("Fraction");
  },

  drawData: function() {
    var data = this.get('data');
    var x = this.get('xScale');
    var y = this.get('yScale');

    var svg = this.get('chartSVG');

    var chartLine = line()
      .x(function(d) {
        return x(d[0]);
      })
      .y(function(d) {
        return y(d[1]);
      });

    var lines = svg
      .selectAll('.line-chart__line__container')
      .data(data);

    // Append the new ones
    lines.enter()
      .append('g')
      .attr('class', 'line-chart__line__container')
      .append('svg:path')
      .attr('class', 'line-chart__line')
      .style('stroke', function(d) {
        return d.color;
      })
      .attr('d', function(d) {
        return chartLine(d.values);
      })
      .attr('fill', 'none');

    var circles = svg
      .selectAll("circle")
      .data(data[0].values.map((p) => ( {'x': p[0], 'y': p[1]} )));

    // Append the new ones
    circles
      .enter()
      .append("circle")
      .attr("cx", function (d) { return x(d.x); })
      .attr("cy", function (d) { return y(d.y); })
      .attr("r", function () { return 4; })
      .style("fill", function() { return 'steelblue'; });

  },

});
