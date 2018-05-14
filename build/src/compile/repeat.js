import * as tslib_1 from "tslib";
import * as log from '../log';
import { BaseConcatModel } from './baseconcat';
import { buildModel } from './buildmodel';
import { parseRepeatLayoutSize } from './layoutsize/parse';
var RepeatModel = /** @class */ (function (_super) {
    tslib_1.__extends(RepeatModel, _super);
    function RepeatModel(spec, parent, parentGivenName, repeatValues, config) {
        var _this = _super.call(this, spec, parent, parentGivenName, config, repeatValues, spec.resolve) || this;
        _this.type = 'repeat';
        if (spec.resolve && spec.resolve.axis && (spec.resolve.axis.x === 'shared' || spec.resolve.axis.y === 'shared')) {
            log.warn(log.message.REPEAT_CANNOT_SHARE_AXIS);
        }
        _this.repeat = spec.repeat;
        _this.children = _this._initChildren(spec, _this.repeat, repeatValues, config);
        return _this;
    }
    RepeatModel.prototype._initChildren = function (spec, repeat, repeater, config) {
        var children = [];
        var row = repeat.row || [repeater ? repeater.row : null];
        var column = repeat.column || [repeater ? repeater.column : null];
        // cross product
        for (var _i = 0, row_1 = row; _i < row_1.length; _i++) {
            var rowField = row_1[_i];
            for (var _a = 0, column_1 = column; _a < column_1.length; _a++) {
                var columnField = column_1[_a];
                var name_1 = (rowField ? '_' + rowField : '') + (columnField ? '_' + columnField : '');
                var childRepeat = {
                    row: rowField,
                    column: columnField
                };
                children.push(buildModel(spec.spec, this, this.getName('child' + name_1), undefined, childRepeat, config, false));
            }
        }
        return children;
    };
    RepeatModel.prototype.parseLayoutSize = function () {
        parseRepeatLayoutSize(this);
    };
    RepeatModel.prototype.assembleLayout = function () {
        // TODO: allow customization
        return {
            padding: { row: 10, column: 10 },
            offset: 10,
            columns: this.repeat && this.repeat.column ? this.repeat.column.length : 1,
            bounds: 'full',
            align: 'all'
        };
    };
    return RepeatModel;
}(BaseConcatModel));
export { RepeatModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBpbGUvcmVwZWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEtBQUssR0FBRyxNQUFNLFFBQVEsQ0FBQztBQUk5QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFJekQ7SUFBaUMsdUNBQWU7SUFNOUMscUJBQVksSUFBMEIsRUFBRSxNQUFhLEVBQUUsZUFBdUIsRUFBRSxZQUEyQixFQUFFLE1BQWM7UUFBM0gsWUFDRSxrQkFBTSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FRekU7UUFkZSxVQUFJLEdBQWEsUUFBUSxDQUFDO1FBUXhDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxFQUFFO1lBQy9HLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7O0lBQzlFLENBQUM7SUFFTyxtQ0FBYSxHQUFyQixVQUFzQixJQUEwQixFQUFFLE1BQWMsRUFBRSxRQUF1QixFQUFFLE1BQWM7UUFDdkcsSUFBTSxRQUFRLEdBQVksRUFBRSxDQUFDO1FBQzdCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBFLGdCQUFnQjtRQUNoQixLQUF1QixVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztZQUFyQixJQUFNLFFBQVEsWUFBQTtZQUNqQixLQUEwQixVQUFNLEVBQU4saUJBQU0sRUFBTixvQkFBTSxFQUFOLElBQU07Z0JBQTNCLElBQU0sV0FBVyxlQUFBO2dCQUNwQixJQUFNLE1BQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUV2RixJQUFNLFdBQVcsR0FBRztvQkFDbEIsR0FBRyxFQUFFLFFBQVE7b0JBQ2IsTUFBTSxFQUFFLFdBQVc7aUJBQ3BCLENBQUM7Z0JBRUYsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsTUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNqSDtTQUNGO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVNLHFDQUFlLEdBQXRCO1FBQ0UscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLG9DQUFjLEdBQXJCO1FBQ0UsNEJBQTRCO1FBQzVCLE9BQU87WUFDTCxPQUFPLEVBQUUsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUM7WUFDOUIsTUFBTSxFQUFFLEVBQUU7WUFDVixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDO0lBQ0osQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXJERCxDQUFpQyxlQUFlLEdBcUQvQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nJztcbmltcG9ydCB7UmVwZWF0fSBmcm9tICcuLi9yZXBlYXQnO1xuaW1wb3J0IHtOb3JtYWxpemVkUmVwZWF0U3BlY30gZnJvbSAnLi4vc3BlYyc7XG5pbXBvcnQge1ZnTGF5b3V0fSBmcm9tICcuLi92ZWdhLnNjaGVtYSc7XG5pbXBvcnQge0Jhc2VDb25jYXRNb2RlbH0gZnJvbSAnLi9iYXNlY29uY2F0JztcbmltcG9ydCB7YnVpbGRNb2RlbH0gZnJvbSAnLi9idWlsZG1vZGVsJztcbmltcG9ydCB7cGFyc2VSZXBlYXRMYXlvdXRTaXplfSBmcm9tICcuL2xheW91dHNpemUvcGFyc2UnO1xuaW1wb3J0IHtNb2RlbH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge1JlcGVhdGVyVmFsdWV9IGZyb20gJy4vcmVwZWF0ZXInO1xuXG5leHBvcnQgY2xhc3MgUmVwZWF0TW9kZWwgZXh0ZW5kcyBCYXNlQ29uY2F0TW9kZWwge1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogJ3JlcGVhdCcgPSAncmVwZWF0JztcbiAgcHVibGljIHJlYWRvbmx5IHJlcGVhdDogUmVwZWF0O1xuXG4gIHB1YmxpYyByZWFkb25seSBjaGlsZHJlbjogTW9kZWxbXTtcblxuICBjb25zdHJ1Y3RvcihzcGVjOiBOb3JtYWxpemVkUmVwZWF0U3BlYywgcGFyZW50OiBNb2RlbCwgcGFyZW50R2l2ZW5OYW1lOiBzdHJpbmcsIHJlcGVhdFZhbHVlczogUmVwZWF0ZXJWYWx1ZSwgY29uZmlnOiBDb25maWcpIHtcbiAgICBzdXBlcihzcGVjLCBwYXJlbnQsIHBhcmVudEdpdmVuTmFtZSwgY29uZmlnLCByZXBlYXRWYWx1ZXMsIHNwZWMucmVzb2x2ZSk7XG5cbiAgICBpZiAoc3BlYy5yZXNvbHZlICYmIHNwZWMucmVzb2x2ZS5heGlzICYmIChzcGVjLnJlc29sdmUuYXhpcy54ID09PSAnc2hhcmVkJyB8fCBzcGVjLnJlc29sdmUuYXhpcy55ID09PSAnc2hhcmVkJykpIHtcbiAgICAgIGxvZy53YXJuKGxvZy5tZXNzYWdlLlJFUEVBVF9DQU5OT1RfU0hBUkVfQVhJUyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXBlYXQgPSBzcGVjLnJlcGVhdDtcbiAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5faW5pdENoaWxkcmVuKHNwZWMsIHRoaXMucmVwZWF0LCByZXBlYXRWYWx1ZXMsIGNvbmZpZyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2hpbGRyZW4oc3BlYzogTm9ybWFsaXplZFJlcGVhdFNwZWMsIHJlcGVhdDogUmVwZWF0LCByZXBlYXRlcjogUmVwZWF0ZXJWYWx1ZSwgY29uZmlnOiBDb25maWcpOiBNb2RlbFtdIHtcbiAgICBjb25zdCBjaGlsZHJlbjogTW9kZWxbXSA9IFtdO1xuICAgIGNvbnN0IHJvdyA9IHJlcGVhdC5yb3cgfHwgW3JlcGVhdGVyID8gcmVwZWF0ZXIucm93IDogbnVsbF07XG4gICAgY29uc3QgY29sdW1uID0gcmVwZWF0LmNvbHVtbiB8fCBbcmVwZWF0ZXIgPyByZXBlYXRlci5jb2x1bW4gOiBudWxsXTtcblxuICAgIC8vIGNyb3NzIHByb2R1Y3RcbiAgICBmb3IgKGNvbnN0IHJvd0ZpZWxkIG9mIHJvdykge1xuICAgICAgZm9yIChjb25zdCBjb2x1bW5GaWVsZCBvZiBjb2x1bW4pIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IChyb3dGaWVsZCA/ICdfJyArIHJvd0ZpZWxkIDogJycpICsgKGNvbHVtbkZpZWxkID8gJ18nICsgY29sdW1uRmllbGQgOiAnJyk7XG5cbiAgICAgICAgY29uc3QgY2hpbGRSZXBlYXQgPSB7XG4gICAgICAgICAgcm93OiByb3dGaWVsZCxcbiAgICAgICAgICBjb2x1bW46IGNvbHVtbkZpZWxkXG4gICAgICAgIH07XG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaChidWlsZE1vZGVsKHNwZWMuc3BlYywgdGhpcywgdGhpcy5nZXROYW1lKCdjaGlsZCcgKyBuYW1lKSwgdW5kZWZpbmVkLCBjaGlsZFJlcGVhdCwgY29uZmlnLCBmYWxzZSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZUxheW91dFNpemUoKSB7XG4gICAgcGFyc2VSZXBlYXRMYXlvdXRTaXplKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIGFzc2VtYmxlTGF5b3V0KCk6IFZnTGF5b3V0IHtcbiAgICAvLyBUT0RPOiBhbGxvdyBjdXN0b21pemF0aW9uXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZGRpbmc6IHtyb3c6IDEwLCBjb2x1bW46IDEwfSxcbiAgICAgIG9mZnNldDogMTAsXG4gICAgICBjb2x1bW5zOiB0aGlzLnJlcGVhdCAmJiB0aGlzLnJlcGVhdC5jb2x1bW4gPyB0aGlzLnJlcGVhdC5jb2x1bW4ubGVuZ3RoIDogMSxcbiAgICAgIGJvdW5kczogJ2Z1bGwnLFxuICAgICAgYWxpZ246ICdhbGwnXG4gICAgfTtcbiAgfVxufVxuIl19