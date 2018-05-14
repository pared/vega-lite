/* tslint:disable:quotemark */
import { assert } from 'chai';
import { COLOR } from '../../../src/channel';
import * as encode from '../../../src/compile/legend/encode';
import { TimeUnit } from '../../../src/timeunit';
import { TEMPORAL } from '../../../src/type';
import { parseUnitModelWithScale } from '../../util';
describe('compile/legend', function () {
    describe('encode.symbols', function () {
        it('should not have fill, strokeDash, or strokeDashOffset', function () {
            var symbol = encode.symbols({ field: 'a', type: 'nominal' }, {}, parseUnitModelWithScale({
                mark: "point",
                encoding: {
                    x: { field: "a", type: "nominal" },
                    color: { field: "a", type: "nominal" }
                }
            }), COLOR, 'symbol');
            assert.deepEqual(symbol.fill, { value: 'transparent' });
            assert.isUndefined((symbol || {}).strokeDash);
            assert.isUndefined((symbol || {}).strokeDashOffset);
        });
        it('should return specific symbols.shape.value if user has specified', function () {
            var symbol = encode.symbols({ field: 'a', type: 'nominal' }, {}, parseUnitModelWithScale({
                mark: "point",
                encoding: {
                    x: { field: "a", type: "nominal" },
                    shape: { value: "square" }
                }
            }), COLOR, 'symbol');
            assert.deepEqual(symbol.shape['value'], 'square');
        });
        it('should have default opacity', function () {
            var symbol = encode.symbols({ field: 'a', type: 'nominal' }, {}, parseUnitModelWithScale({
                mark: "point",
                encoding: {
                    x: { field: "a", type: "nominal" }
                }
            }), COLOR, 'symbol');
            assert.deepEqual(symbol.opacity['value'], 0.7); // default opacity is 0.7.
        });
        it('should return the maximum value when there is a condition', function () {
            var symbol = encode.symbols({ field: 'a', type: 'nominal' }, {}, parseUnitModelWithScale({
                mark: "point",
                encoding: {
                    x: { field: "a", type: "nominal" },
                    opacity: {
                        condition: { selection: "brush", value: 1 },
                        value: 0
                    }
                }
            }), COLOR, 'symbol');
            assert.deepEqual(symbol.opacity['value'], 1);
        });
    });
    describe('encode.gradient', function () {
        it('should have default opacity', function () {
            var gradient = encode.gradient({ field: 'a', type: 'quantitative' }, {}, parseUnitModelWithScale({
                mark: "point",
                encoding: {
                    x: { field: "a", type: "quantitative" }
                }
            }), COLOR, 'gradient');
            assert.deepEqual(gradient.opacity['value'], 0.7); // default opacity is 0.7.
        });
    });
    describe('encode.labels', function () {
        it('should return correct expression for the timeUnit: TimeUnit.MONTH', function () {
            var model = parseUnitModelWithScale({
                mark: "point",
                encoding: {
                    x: { field: "a", type: "temporal" },
                    color: { field: "a", type: "temporal", timeUnit: "month" }
                }
            });
            var fieldDef = { field: 'a', type: TEMPORAL, timeUnit: TimeUnit.MONTH };
            var label = encode.labels(fieldDef, {}, model, COLOR, 'gradient');
            var expected = "timeFormat(datum.value, '%b')";
            assert.deepEqual(label.text.signal, expected);
        });
        it('should return correct expression for the timeUnit: TimeUnit.QUARTER', function () {
            var model = parseUnitModelWithScale({
                mark: "point",
                encoding: {
                    x: { field: "a", type: "temporal" },
                    color: { field: "a", type: "temporal", timeUnit: "quarter" }
                }
            });
            var fieldDef = { field: 'a', type: TEMPORAL, timeUnit: TimeUnit.QUARTER };
            var label = encode.labels(fieldDef, {}, model, COLOR, 'gradient');
            var expected = "'Q' + quarter(datum.value)";
            assert.deepEqual(label.text.signal, expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2NvbXBpbGUvbGVnZW5kL2VuY29kZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhCQUE4QjtBQUU5QixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRW5ELFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtJQUN6QixRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDekIsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO1lBRTFELElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBRSxFQUFFLEVBQUUsdUJBQXVCLENBQUM7Z0JBQ3JGLElBQUksRUFBRSxPQUFPO2dCQUNiLFFBQVEsRUFBRTtvQkFDUixDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7b0JBQ2hDLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztpQkFDckM7YUFDRixDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFDLEtBQUssRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FB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QUssRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO2lCQUFDO2FBQzlELENBQUMsQ0FBQztZQUVILElBQU0sUUFBUSxHQUFHLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFDLENBQUM7WUFDMUUsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDcEUsSUFBTSxRQUFRLEdBQUcsNEJBQTRCLENBQUM7WUFDOUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpxdW90ZW1hcmsgKi9cblxuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtDT0xPUn0gZnJvbSAnLi4vLi4vLi4vc3JjL2NoYW5uZWwnO1xuaW1wb3J0ICogYXMgZW5jb2RlIGZyb20gJy4uLy4uLy4uL3NyYy9jb21waWxlL2xlZ2VuZC9lbmNvZGUnO1xuaW1wb3J0IHtUaW1lVW5pdH0gZnJvbSAnLi4vLi4vLi4vc3JjL3RpbWV1bml0JztcbmltcG9ydCB7VEVNUE9SQUx9IGZyb20gJy4uLy4uLy4uL3NyYy90eXBlJztcbmltcG9ydCB7cGFyc2VVbml0TW9kZWxXaXRoU2NhbGV9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5kZXNjcmliZSgnY29tcGlsZS9sZWdlbmQnLCBmdW5jdGlvbigpIHtcbiAgZGVzY3JpYmUoJ2VuY29kZS5zeW1ib2xzJywgZnVuY3Rpb24oKSB7XG4gICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSBmaWxsLCBzdHJva2VEYXNoLCBvciBzdHJva2VEYXNoT2Zmc2V0JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGNvbnN0IHN5bWJvbCA9IGVuY29kZS5zeW1ib2xzKHtmaWVsZDogJ2EnLCB0eXBlOiAnbm9taW5hbCd9LCB7fSwgcGFyc2VVbml0TW9kZWxXaXRoU2NhbGUoe1xuICAgICAgICAgIG1hcms6IFwicG9pbnRcIixcbiAgICAgICAgICBlbmNvZGluZzoge1xuICAgICAgICAgICAgeDoge2ZpZWxkOiBcImFcIiwgdHlwZTogXCJub21pbmFsXCJ9LFxuICAgICAgICAgICAgY29sb3I6IHtmaWVsZDogXCJhXCIsIHR5cGU6IFwibm9taW5hbFwifVxuICAgICAgICAgIH1cbiAgICAgICAgfSksIENPTE9SLCAnc3ltYm9sJyk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3ltYm9sLmZpbGwsIHt2YWx1ZTogJ3RyYW5zcGFyZW50J30pO1xuICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQoKHN5bWJvbHx8e30pLnN0cm9rZURhc2gpO1xuICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQoKHN5bWJvbHx8e30pLnN0cm9rZURhc2hPZmZzZXQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gc3BlY2lmaWMgc3ltYm9scy5zaGFwZS52YWx1ZSBpZiB1c2VyIGhhcyBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcblxuICAgICAgY29uc3Qgc3ltYm9sID0gZW5jb2RlLnN5bWJvbHMoe2ZpZWxkOiAnYScsIHR5cGU6ICdub21pbmFsJ30sIHt9LCBwYXJzZVVuaXRNb2RlbFdpdGhTY2FsZSh7XG4gICAgICAgICAgbWFyazogXCJwb2ludFwiLFxuICAgICAgICAgIGVuY29kaW5nOiB7XG4gICAgICAgICAgICB4OiB7ZmllbGQ6IFwiYVwiLCB0eXBlOiBcIm5vbWluYWxcIn0sXG4gICAgICAgICAgICBzaGFwZToge3ZhbHVlOiBcInNxdWFyZVwifX1cbiAgICAgICAgfSksIENPTE9SLCAnc3ltYm9sJyk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3ltYm9sLnNoYXBlWyd2YWx1ZSddLCAnc3F1YXJlJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZGVmYXVsdCBvcGFjaXR5JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGNvbnN0IHN5bWJvbCA9IGVuY29kZS5zeW1ib2xzKHtmaWVsZDogJ2EnLCB0eXBlOiAnbm9taW5hbCd9LCB7fSwgcGFyc2VVbml0TW9kZWxXaXRoU2NhbGUoe1xuICAgICAgICAgIG1hcms6IFwicG9pbnRcIixcbiAgICAgICAgICBlbmNvZGluZzoge1xuICAgICAgICAgICAgeDoge2ZpZWxkOiBcImFcIiwgdHlwZTogXCJub21pbmFsXCJ9fVxuICAgICAgICB9KSwgQ09MT1IsICdzeW1ib2wnKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3ltYm9sLm9wYWNpdHlbJ3ZhbHVlJ10sIDAuNyk7IC8vIGRlZmF1bHQgb3BhY2l0eSBpcyAwLjcuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbWF4aW11bSB2YWx1ZSB3aGVuIHRoZXJlIGlzIGEgY29uZGl0aW9uJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGNvbnN0IHN5bWJvbCA9IGVuY29kZS5zeW1ib2xzKHtmaWVsZDogJ2EnLCB0eXBlOiAnbm9taW5hbCd9LCB7fSwgcGFyc2VVbml0TW9kZWxXaXRoU2NhbGUoe1xuICAgICAgICAgIG1hcms6IFwicG9pbnRcIixcbiAgICAgICAgICBlbmNvZGluZzoge1xuICAgICAgICAgICAgeDoge2ZpZWxkOiBcImFcIiwgdHlwZTogXCJub21pbmFsXCJ9LFxuICAgICAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgICBjb25kaXRpb246IHtzZWxlY3Rpb246IFwiYnJ1c2hcIiwgdmFsdWU6IDF9LFxuICAgICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICAgICAgfX1cbiAgICAgICAgfSksIENPTE9SLCAnc3ltYm9sJyk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3ltYm9sLm9wYWNpdHlbJ3ZhbHVlJ10sIDEpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZW5jb2RlLmdyYWRpZW50JywgZnVuY3Rpb24oKSB7XG4gICAgaXQoJ3Nob3VsZCBoYXZlIGRlZmF1bHQgb3BhY2l0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgZ3JhZGllbnQgPSBlbmNvZGUuZ3JhZGllbnQoe2ZpZWxkOiAnYScsIHR5cGU6ICdxdWFudGl0YXRpdmUnfSwge30sIHBhcnNlVW5pdE1vZGVsV2l0aFNjYWxlKHtcbiAgICAgICAgICBtYXJrOiBcInBvaW50XCIsXG4gICAgICAgICAgZW5jb2Rpbmc6IHtcbiAgICAgICAgICAgIHg6IHtmaWVsZDogXCJhXCIsIHR5cGU6IFwicXVhbnRpdGF0aXZlXCJ9fVxuICAgICAgICB9KSwgQ09MT1IsICdncmFkaWVudCcpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGdyYWRpZW50Lm9wYWNpdHlbJ3ZhbHVlJ10sIDAuNyk7IC8vIGRlZmF1bHQgb3BhY2l0eSBpcyAwLjcuXG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdlbmNvZGUubGFiZWxzJywgZnVuY3Rpb24oKSB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCBleHByZXNzaW9uIGZvciB0aGUgdGltZVVuaXQ6IFRpbWVVbml0Lk1PTlRIJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGNvbnN0IG1vZGVsID0gcGFyc2VVbml0TW9kZWxXaXRoU2NhbGUoe1xuICAgICAgICBtYXJrOiBcInBvaW50XCIsXG4gICAgICAgIGVuY29kaW5nOiB7XG4gICAgICAgICAgeDoge2ZpZWxkOiBcImFcIiwgdHlwZTogXCJ0ZW1wb3JhbFwifSxcbiAgICAgICAgICBjb2xvcjoge2ZpZWxkOiBcImFcIiwgdHlwZTogXCJ0ZW1wb3JhbFwiLCB0aW1lVW5pdDogXCJtb250aFwifVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZmllbGREZWYgPSB7ZmllbGQ6ICdhJywgdHlwZTogVEVNUE9SQUwsIHRpbWVVbml0OiBUaW1lVW5pdC5NT05USH07XG4gICAgICBjb25zdCBsYWJlbCA9IGVuY29kZS5sYWJlbHMoZmllbGREZWYsIHt9LCBtb2RlbCwgQ09MT1IsICdncmFkaWVudCcpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBgdGltZUZvcm1hdChkYXR1bS52YWx1ZSwgJyViJylgO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChsYWJlbC50ZXh0LnNpZ25hbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCBleHByZXNzaW9uIGZvciB0aGUgdGltZVVuaXQ6IFRpbWVVbml0LlFVQVJURVInLCBmdW5jdGlvbigpIHtcblxuICAgICAgY29uc3QgbW9kZWwgPSBwYXJzZVVuaXRNb2RlbFdpdGhTY2FsZSh7XG4gICAgICAgIG1hcms6IFwicG9pbnRcIixcbiAgICAgICAgZW5jb2Rpbmc6IHtcbiAgICAgICAgICB4OiB7ZmllbGQ6IFwiYVwiLCB0eXBlOiBcInRlbXBvcmFsXCJ9LFxuICAgICAgICAgIGNvbG9yOiB7ZmllbGQ6IFwiYVwiLCB0eXBlOiBcInRlbXBvcmFsXCIsIHRpbWVVbml0OiBcInF1YXJ0ZXJcIn19XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZmllbGREZWYgPSB7ZmllbGQ6ICdhJywgdHlwZTogVEVNUE9SQUwsIHRpbWVVbml0OiBUaW1lVW5pdC5RVUFSVEVSfTtcbiAgICAgIGNvbnN0IGxhYmVsID0gZW5jb2RlLmxhYmVscyhmaWVsZERlZiwge30sIG1vZGVsLCBDT0xPUiwgJ2dyYWRpZW50Jyk7XG4gICAgICBjb25zdCBleHBlY3RlZCA9IGAnUScgKyBxdWFydGVyKGRhdHVtLnZhbHVlKWA7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGxhYmVsLnRleHQuc2lnbmFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=