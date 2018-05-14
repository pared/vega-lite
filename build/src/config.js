import * as tslib_1 from "tslib";
import { isObject } from 'vega-util';
import { COMPOSITE_MARK_STYLES } from './compositemark';
import { VL_ONLY_COMPOSITE_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX } from './compositemark/index';
import { VL_ONLY_GUIDE_CONFIG } from './guide';
import { defaultLegendConfig } from './legend';
import { PRIMITIVE_MARKS, VL_ONLY_MARK_CONFIG_PROPERTIES, VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX } from './mark';
import * as mark from './mark';
import { defaultScaleConfig } from './scale';
import { defaultConfig as defaultSelectionConfig } from './selection';
import { extractTitleConfig } from './title';
import { duplicate, keys, mergeDeep } from './util';
export var defaultViewConfig = {
    width: 200,
    height: 200
};
export var defaultConfig = {
    padding: 5,
    timeFormat: '',
    countTitle: 'Number of Records',
    invalidValues: 'filter',
    view: defaultViewConfig,
    mark: mark.defaultMarkConfig,
    area: {},
    bar: mark.defaultBarConfig,
    circle: {},
    geoshape: {},
    line: {},
    point: {},
    rect: {},
    rule: { color: 'black' },
    square: {},
    text: { color: 'black' },
    tick: mark.defaultTickConfig,
    trail: {},
    box: { size: 14, extent: 1.5 },
    boxWhisker: {},
    boxMid: { color: 'white' },
    scale: defaultScaleConfig,
    projection: {},
    axis: {},
    axisX: {},
    axisY: { minExtent: 30 },
    axisLeft: {},
    axisRight: {},
    axisTop: {},
    axisBottom: {},
    axisBand: {},
    legend: defaultLegendConfig,
    selection: defaultSelectionConfig,
    style: {},
    title: {},
};
export function initConfig(config) {
    return mergeDeep(duplicate(defaultConfig), config);
}
var MARK_STYLES = ['view'].concat(PRIMITIVE_MARKS, COMPOSITE_MARK_STYLES);
var VL_ONLY_CONFIG_PROPERTIES = [
    'padding', 'numberFormat', 'timeFormat', 'countTitle',
    'stack', 'scale', 'selection', 'invalidValues',
    'overlay' // FIXME: Redesign and unhide this
];
var VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = tslib_1.__assign({ view: ['width', 'height'] }, VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX, VL_ONLY_COMPOSITE_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX);
export function stripAndRedirectConfig(config) {
    config = duplicate(config);
    for (var _i = 0, VL_ONLY_CONFIG_PROPERTIES_1 = VL_ONLY_CONFIG_PROPERTIES; _i < VL_ONLY_CONFIG_PROPERTIES_1.length; _i++) {
        var prop = VL_ONLY_CONFIG_PROPERTIES_1[_i];
        delete config[prop];
    }
    // Remove Vega-Lite only axis/legend config
    if (config.axis) {
        for (var _a = 0, VL_ONLY_GUIDE_CONFIG_1 = VL_ONLY_GUIDE_CONFIG; _a < VL_ONLY_GUIDE_CONFIG_1.length; _a++) {
            var prop = VL_ONLY_GUIDE_CONFIG_1[_a];
            delete config.axis[prop];
        }
    }
    if (config.legend) {
        for (var _b = 0, VL_ONLY_GUIDE_CONFIG_2 = VL_ONLY_GUIDE_CONFIG; _b < VL_ONLY_GUIDE_CONFIG_2.length; _b++) {
            var prop = VL_ONLY_GUIDE_CONFIG_2[_b];
            delete config.legend[prop];
        }
    }
    // Remove Vega-Lite only generic mark config
    if (config.mark) {
        for (var _c = 0, VL_ONLY_MARK_CONFIG_PROPERTIES_1 = VL_ONLY_MARK_CONFIG_PROPERTIES; _c < VL_ONLY_MARK_CONFIG_PROPERTIES_1.length; _c++) {
            var prop = VL_ONLY_MARK_CONFIG_PROPERTIES_1[_c];
            delete config.mark[prop];
        }
    }
    for (var _d = 0, MARK_STYLES_1 = MARK_STYLES; _d < MARK_STYLES_1.length; _d++) {
        var markType = MARK_STYLES_1[_d];
        // Remove Vega-Lite-only mark config
        for (var _e = 0, VL_ONLY_MARK_CONFIG_PROPERTIES_2 = VL_ONLY_MARK_CONFIG_PROPERTIES; _e < VL_ONLY_MARK_CONFIG_PROPERTIES_2.length; _e++) {
            var prop = VL_ONLY_MARK_CONFIG_PROPERTIES_2[_e];
            delete config[markType][prop];
        }
        // Remove Vega-Lite only mark-specific config
        var vlOnlyMarkSpecificConfigs = VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX[markType];
        if (vlOnlyMarkSpecificConfigs) {
            for (var _f = 0, vlOnlyMarkSpecificConfigs_1 = vlOnlyMarkSpecificConfigs; _f < vlOnlyMarkSpecificConfigs_1.length; _f++) {
                var prop = vlOnlyMarkSpecificConfigs_1[_f];
                delete config[markType][prop];
            }
        }
        // Redirect mark config to config.style so that mark config only affect its own mark type
        // without affecting other marks that share the same underlying Vega marks.
        // For example, config.rect should not affect bar marks.
        redirectConfig(config, markType);
    }
    // Redirect config.title -- so that title config do not
    // affect header labels, which also uses `title` directive to implement.
    redirectConfig(config, 'title', 'group-title');
    // Remove empty config objects
    for (var prop in config) {
        if (isObject(config[prop]) && keys(config[prop]).length === 0) {
            delete config[prop];
        }
    }
    return keys(config).length > 0 ? config : undefined;
}
function redirectConfig(config, prop, toProp) {
    var propConfig = prop === 'title' ? extractTitleConfig(config.title).mark : config[prop];
    if (prop === 'view') {
        toProp = 'cell'; // View's default style is "cell"
    }
    var style = tslib_1.__assign({}, propConfig, config.style[prop]);
    // set config.style if it is not an empty object
    if (keys(style).length > 0) {
        config.style[toProp || prop] = style;
    }
    delete config[prop];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVuQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQWdELHFEQUFxRCxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0ksT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxtQkFBbUIsRUFBZSxNQUFNLFVBQVUsQ0FBQztBQUMzRCxPQUFPLEVBQXlCLGVBQWUsRUFBRSw4QkFBOEIsRUFBRSwyQ0FBMkMsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM1SSxPQUFPLEtBQUssSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUUvQixPQUFPLEVBQUMsa0JBQWtCLEVBQWMsTUFBTSxTQUFTLENBQUM7QUFDeEQsT0FBTyxFQUFDLGFBQWEsSUFBSSxzQkFBc0IsRUFBa0IsTUFBTSxhQUFhLENBQUM7QUFFckYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTNDLE9BQU8sRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQW9GbEQsTUFBTSxDQUFDLElBQU0saUJBQWlCLEdBQWU7SUFDM0MsS0FBSyxFQUFFLEdBQUc7SUFDVixNQUFNLEVBQUUsR0FBRztDQUNaLENBQUM7QUE0SEYsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFXO0lBQ25DLE9BQU8sRUFBRSxDQUFDO0lBQ1YsVUFBVSxFQUFFLEVBQUU7SUFDZCxVQUFVLEVBQUUsbUJBQW1CO0lBRS9CLGFBQWEsRUFBRSxRQUFRO0lBRXZCLElBQUksRUFBRSxpQkFBaUI7SUFFdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7SUFDNUIsSUFBSSxFQUFFLEVB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LENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ3RELENBQUM7QUFFRCx3QkFBd0IsTUFBYyxFQUFFLElBQWtELEVBQUUsTUFBZTtJQUN6RyxJQUFNLFVBQVUsR0FBaUIsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpHLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNuQixNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsaUNBQWlDO0tBQ25EO0lBRUQsSUFBTSxLQUFLLHdCQUNOLFVBQVUsRUFDVixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUN0QixDQUFDO0lBQ0YsZ0RBQWdEO0lBQ2hELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNPYmplY3R9IGZyb20gJ3ZlZ2EtdXRpbCc7XG5pbXBvcnQge0F4aXNDb25maWdNaXhpbnN9IGZyb20gJy4vYXhpcyc7XG5pbXBvcnQge0NPTVBPU0lURV9NQVJLX1NUWUxFU30gZnJvbSAnLi9jb21wb3NpdGVtYXJrJztcbmltcG9ydCB7Q29tcG9zaXRlTWFya0NvbmZpZ01peGlucywgQ29tcG9zaXRlTWFya1N0eWxlLCBWTF9PTkxZX0NPTVBPU0lURV9NQVJLX1NQRUNJRklDX0NPTkZJR19QUk9QRVJUWV9JTkRFWH0gZnJvbSAnLi9jb21wb3NpdGVtYXJrL2luZGV4JztcbmltcG9ydCB7VkxfT05MWV9HVUlERV9DT05GSUd9IGZyb20gJy4vZ3VpZGUnO1xuaW1wb3J0IHtkZWZhdWx0TGVnZW5kQ29uZmlnLCBMZWdlbmRDb25maWd9IGZyb20gJy4vbGVnZW5kJztcbmltcG9ydCB7TWFyaywgTWFya0NvbmZpZ01peGlucywgUFJJTUlUSVZFX01BUktTLCBWTF9PTkxZX01BUktfQ09ORklHX1BST1BFUlRJRVMsIFZMX09OTFlfTUFSS19TUEVDSUZJQ19DT05GSUdfUFJPUEVSVFlfSU5ERVh9IGZyb20gJy4vbWFyayc7XG5pbXBvcnQgKiBhcyBtYXJrIGZyb20gJy4vbWFyayc7XG5pbXBvcnQge1Byb2plY3Rpb25Db25maWd9IGZyb20gJy4vcHJvamVjdGlvbic7XG5pbXBvcnQge2RlZmF1bHRTY2FsZUNvbmZpZywgU2NhbGVDb25maWd9IGZyb20gJy4vc2NhbGUnO1xuaW1wb3J0IHtkZWZhdWx0Q29uZmlnIGFzIGRlZmF1bHRTZWxlY3Rpb25Db25maWcsIFNlbGVjdGlvbkNvbmZpZ30gZnJvbSAnLi9zZWxlY3Rpb24nO1xuaW1wb3J0IHtTdGFja09mZnNldH0gZnJvbSAnLi9zdGFjayc7XG5pbXBvcnQge2V4dHJhY3RUaXRsZUNvbmZpZ30gZnJvbSAnLi90aXRsZSc7XG5pbXBvcnQge1RvcExldmVsUHJvcGVydGllc30gZnJvbSAnLi90b3BsZXZlbHByb3BzJztcbmltcG9ydCB7ZHVwbGljYXRlLCBrZXlzLCBtZXJnZURlZXB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1ZnTWFya0NvbmZpZywgVmdTY2hlbWUsIFZnVGl0bGVDb25maWd9IGZyb20gJy4vdmVnYS5zY2hlbWEnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlld0NvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCB3aWR0aCBvZiB0aGUgc2luZ2xlIHBsb3Qgb3IgZWFjaCBwbG90IGluIGEgdHJlbGxpcyBwbG90IHdoZW4gdGhlIHZpc3VhbGl6YXRpb24gaGFzIGEgY29udGludW91cyAobm9uLW9yZGluYWwpIHgtc2NhbGUgb3Igb3JkaW5hbCB4LXNjYWxlIHdpdGggYHJhbmdlU3RlcGAgPSBgbnVsbGAuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyBgMjAwYFxuICAgKlxuICAgKi9cbiAgd2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGhlaWdodCBvZiB0aGUgc2luZ2xlIHBsb3Qgb3IgZWFjaCBwbG90IGluIGEgdHJlbGxpcyBwbG90IHdoZW4gdGhlIHZpc3VhbGl6YXRpb24gaGFzIGEgY29udGludW91cyAobm9uLW9yZGluYWwpIHktc2NhbGUgd2l0aCBgcmFuZ2VTdGVwYCA9IGBudWxsYC5cbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIGAyMDBgXG4gICAqXG4gICAqL1xuICBoZWlnaHQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHZpZXcgc2hvdWxkIGJlIGNsaXBwZWQuXG4gICAqL1xuICBjbGlwPzogYm9vbGVhbjtcblxuICAvLyBGSUxMX1NUUk9LRV9DT05GSUdcbiAgLyoqXG4gICAqIFRoZSBmaWxsIGNvbG9yLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gKG5vbmUpXG4gICAqXG4gICAqL1xuICBmaWxsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlsbCBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS5cbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIChub25lKVxuICAgKlxuICAgKi9cbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHJva2UgY29sb3IuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyAobm9uZSlcbiAgICpcbiAgICovXG4gIHN0cm9rZT86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSBvcGFjaXR5ICh2YWx1ZSBiZXR3ZWVuIFswLDFdKS5cbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIChub25lKVxuICAgKlxuICAgKi9cbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHN0cm9rZSB3aWR0aCwgaW4gcGl4ZWxzLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gKG5vbmUpXG4gICAqXG4gICAqL1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgc3Ryb2tlLCBzcGFjZSBsZW5ndGhzIGZvciBjcmVhdGluZyBkYXNoZWQgb3IgZG90dGVkIGxpbmVzLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gKG5vbmUpXG4gICAqXG4gICAqL1xuICBzdHJva2VEYXNoPzogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgKGluIHBpeGVscykgaW50byB3aGljaCB0byBiZWdpbiBkcmF3aW5nIHdpdGggdGhlIHN0cm9rZSBkYXNoIGFycmF5LlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gKG5vbmUpXG4gICAqXG4gICAqL1xuICBzdHJva2VEYXNoT2Zmc2V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFZpZXdDb25maWc6IFZpZXdDb25maWcgPSB7XG4gIHdpZHRoOiAyMDAsXG4gIGhlaWdodDogMjAwXG59O1xuXG5leHBvcnQgdHlwZSBSYW5nZUNvbmZpZ1ZhbHVlID0gKG51bWJlcnxzdHJpbmcpW10gfCBWZ1NjaGVtZSB8IHtzdGVwOiBudW1iZXJ9O1xuXG5leHBvcnQgdHlwZSBSYW5nZUNvbmZpZyA9IFJhbmdlQ29uZmlnUHJvcHMgJiB7W25hbWU6IHN0cmluZ106IFJhbmdlQ29uZmlnVmFsdWV9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlQ29uZmlnUHJvcHMge1xuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBmb3IgX25vbWluYWxfIChjYXRlZ29yaWNhbCkgZmllbGRzLlxuICAgKi9cbiAgY2F0ZWdvcnk/OiBzdHJpbmdbXSB8IFZnU2NoZW1lO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHJhbmdlIGZvciBkaXZlcmdpbmcgX3F1YW50aXRhdGl2ZV8gZmllbGRzLlxuICAgKi9cbiAgZGl2ZXJnaW5nPzogc3RyaW5nW10gfCBWZ1NjaGVtZTtcblxuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBmb3IgX3F1YW50aXRhdGl2ZV8gaGVhdG1hcHMuXG4gICAqL1xuICBoZWF0bWFwPzogc3RyaW5nW10gfCBWZ1NjaGVtZTtcblxuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBmb3IgX29yZGluYWxfIGZpZWxkcy5cbiAgICovXG4gIG9yZGluYWw/OiBzdHJpbmdbXSB8IFZnU2NoZW1lO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHJhbmdlIGZvciBfcXVhbnRpdGF0aXZlXyBhbmQgX3RlbXBvcmFsXyBmaWVsZHMuXG4gICAqL1xuICByYW1wPzogc3RyaW5nW10gfCBWZ1NjaGVtZTtcblxuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBwYWxldHRlIGZvciB0aGUgYHNoYXBlYCBjaGFubmVsLlxuICAgKi9cbiAgc3ltYm9sPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVkxPbmx5Q29uZmlnIHtcbiAgLyoqXG4gICAqIERlZmF1bHQgYXhpcyBhbmQgbGVnZW5kIHRpdGxlIGZvciBjb3VudCBmaWVsZHMuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyBgJ051bWJlciBvZiBSZWNvcmRzJ2AuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBjb3VudFRpdGxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGhvdyBWZWdhLUxpdGUgc2hvdWxkIGhhbmRsZSBpbnZhbGlkIHZhbHVlcyAoYG51bGxgIGFuZCBgTmFOYCkuXG4gICAqIC0gSWYgc2V0IHRvIGBcImZpbHRlclwiYCAoZGVmYXVsdCksIGFsbCBkYXRhIGl0ZW1zIHdpdGggbnVsbCB2YWx1ZXMgd2lsbCBiZSBza2lwcGVkIChmb3IgbGluZSwgdHJhaWwsIGFuZCBhcmVhIG1hcmtzKSBvciBmaWx0ZXJlZCAoZm9yIG90aGVyIG1hcmtzKS5cbiAgICogLSBJZiBgbnVsbGAsIGFsbCBkYXRhIGl0ZW1zIGFyZSBpbmNsdWRlZC4gSW4gdGhpcyBjYXNlLCBpbnZhbGlkIHZhbHVlcyB3aWxsIGJlIGludGVycHJldGVkIGFzIHplcm9lcy5cbiAgICovXG4gIGludmFsaWRWYWx1ZXM/OiAnZmlsdGVyJyB8IG51bGw7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgaG93IFZlZ2EtTGl0ZSBnZW5lcmF0ZXMgdGl0bGUgZm9yIGZpZWxkcy4gIFRoZXJlIGFyZSB0aHJlZSBwb3NzaWJsZSBzdHlsZXM6XG4gICAqIC0gYFwidmVyYmFsXCJgIChEZWZhdWx0KSAtIGRpc3BsYXlzIGZ1bmN0aW9uIGluIGEgdmVyYmFsIHN0eWxlIChlLmcuLCBcIlN1bSBvZiBmaWVsZFwiLCBcIlllYXItbW9udGggb2YgZGF0ZVwiLCBcImZpZWxkIChiaW5uZWQpXCIpLlxuICAgKiAtIGBcImZ1bmN0aW9uXCJgIC0gZGlzcGxheXMgZnVuY3Rpb24gdXNpbmcgcGFyZW50aGVzZXMgYW5kIGNhcGl0YWxpemVkIHRleHRzIChlLmcuLCBcIlNVTShmaWVsZClcIiwgXCJZRUFSTU9OVEgoZGF0ZSlcIiwgXCJCSU4oZmllbGQpXCIpLlxuICAgKiAtIGBcInBsYWluXCJgIC0gZGlzcGxheXMgb25seSB0aGUgZmllbGQgbmFtZSB3aXRob3V0IGZ1bmN0aW9ucyAoZS5nLiwgXCJmaWVsZFwiLCBcImRhdGVcIiwgXCJmaWVsZFwiKS5cbiAgICovXG4gIGZpZWxkVGl0bGU/OiAndmVyYmFsJyB8ICdmdW5jdGlvbmFsJyB8ICdwbGFpbic7XG5cbiAgLyoqXG4gICAqIEQzIE51bWJlciBmb3JtYXQgZm9yIGF4aXMgbGFiZWxzIGFuZCB0ZXh0IHRhYmxlcy4gRm9yIGV4YW1wbGUgXCJzXCIgZm9yIFNJIHVuaXRzLiBVc2UgW0QzJ3MgbnVtYmVyIGZvcm1hdCBwYXR0ZXJuXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0I2xvY2FsZV9mb3JtYXQpLlxuICAgKi9cbiAgbnVtYmVyRm9ybWF0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGRhdGV0aW1lIGZvcm1hdCBmb3IgYXhpcyBhbmQgbGVnZW5kIGxhYmVscy4gVGhlIGZvcm1hdCBjYW4gYmUgc2V0IGRpcmVjdGx5IG9uIGVhY2ggYXhpcyBhbmQgbGVnZW5kLiBVc2UgW0QzJ3MgdGltZSBmb3JtYXQgcGF0dGVybl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXRpbWUtZm9ybWF0I2xvY2FsZV9mb3JtYXQpLlxuICAgKlxuICAgKiBfX0RlZmF1bHQgdmFsdWU6X18gYCcnYCAoVGhlIGZvcm1hdCB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5lZCkuXG4gICAqXG4gICAqL1xuICB0aW1lRm9ybWF0Pzogc3RyaW5nO1xuXG5cbiAgLyoqIERlZmF1bHQgcHJvcGVydGllcyBmb3IgW3NpbmdsZSB2aWV3IHBsb3RzXShzcGVjLmh0bWwjc2luZ2xlKS4gKi9cbiAgdmlldz86IFZpZXdDb25maWc7XG5cbiAgLyoqXG4gICAqIFNjYWxlIGNvbmZpZ3VyYXRpb24gZGV0ZXJtaW5lcyBkZWZhdWx0IHByb3BlcnRpZXMgZm9yIGFsbCBbc2NhbGVzXShzY2FsZS5odG1sKS4gRm9yIGEgZnVsbCBsaXN0IG9mIHNjYWxlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucywgcGxlYXNlIHNlZSB0aGUgW2NvcnJlc3BvbmRpbmcgc2VjdGlvbiBvZiB0aGUgc2NhbGUgZG9jdW1lbnRhdGlvbl0oc2NhbGUuaHRtbCNjb25maWcpLlxuICAgKi9cbiAgc2NhbGU/OiBTY2FsZUNvbmZpZztcblxuICAvKiogQW4gb2JqZWN0IGhhc2ggZm9yIGRlZmluaW5nIGRlZmF1bHQgcHJvcGVydGllcyBmb3IgZWFjaCB0eXBlIG9mIHNlbGVjdGlvbnMuICovXG4gIHNlbGVjdGlvbj86IFNlbGVjdGlvbkNvbmZpZztcblxuICAvKiogRGVmYXVsdCBzdGFjayBvZmZzZXQgZm9yIHN0YWNrYWJsZSBtYXJrLiAqL1xuICBzdGFjaz86IFN0YWNrT2Zmc2V0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0eWxlQ29uZmlnSW5kZXgge1xuICBbc3R5bGU6IHN0cmluZ106IFZnTWFya0NvbmZpZztcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZyBleHRlbmRzIFRvcExldmVsUHJvcGVydGllcywgVkxPbmx5Q29uZmlnLCBNYXJrQ29uZmlnTWl4aW5zLCBDb21wb3NpdGVNYXJrQ29uZmlnTWl4aW5zLCBBeGlzQ29uZmlnTWl4aW5zIHtcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGhhc2ggdGhhdCBkZWZpbmVzIGRlZmF1bHQgcmFuZ2UgYXJyYXlzIG9yIHNjaGVtZXMgZm9yIHVzaW5nIHdpdGggc2NhbGVzLlxuICAgKiBGb3IgYSBmdWxsIGxpc3Qgb2Ygc2NhbGUgcmFuZ2UgY29uZmlndXJhdGlvbiBvcHRpb25zLCBwbGVhc2Ugc2VlIHRoZSBbY29ycmVzcG9uZGluZyBzZWN0aW9uIG9mIHRoZSBzY2FsZSBkb2N1bWVudGF0aW9uXShzY2FsZS5odG1sI2NvbmZpZykuXG4gICAqL1xuICByYW5nZT86IFJhbmdlQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBMZWdlbmQgY29uZmlndXJhdGlvbiwgd2hpY2ggZGV0ZXJtaW5lcyBkZWZhdWx0IHByb3BlcnRpZXMgZm9yIGFsbCBbbGVnZW5kc10obGVnZW5kLmh0bWwpLiBGb3IgYSBmdWxsIGxpc3Qgb2YgbGVnZW5kIGNvbmZpZ3VyYXRpb24gb3B0aW9ucywgcGxlYXNlIHNlZSB0aGUgW2NvcnJlc3BvbmRpbmcgc2VjdGlvbiBvZiBpbiB0aGUgbGVnZW5kIGRvY3VtZW50YXRpb25dKGxlZ2VuZC5odG1sI2NvbmZpZykuXG4gICAqL1xuICBsZWdlbmQ/OiBMZWdlbmRDb25maWc7XG5cbiAgLyoqXG4gICAqIFRpdGxlIGNvbmZpZ3VyYXRpb24sIHdoaWNoIGRldGVybWluZXMgZGVmYXVsdCBwcm9wZXJ0aWVzIGZvciBhbGwgW3RpdGxlc10odGl0bGUuaHRtbCkuIEZvciBhIGZ1bGwgbGlzdCBvZiB0aXRsZSBjb25maWd1cmF0aW9uIG9wdGlvbnMsIHBsZWFzZSBzZWUgdGhlIFtjb3JyZXNwb25kaW5nIHNlY3Rpb24gb2YgdGhlIHRpdGxlIGRvY3VtZW50YXRpb25dKHRpdGxlLmh0bWwjY29uZmlnKS5cbiAgICovXG4gIHRpdGxlPzogVmdUaXRsZUNvbmZpZztcblxuICAvKipcbiAgICogUHJvamVjdGlvbiBjb25maWd1cmF0aW9uLCB3aGljaCBkZXRlcm1pbmVzIGRlZmF1bHQgcHJvcGVydGllcyBmb3IgYWxsIFtwcm9qZWN0aW9uc10ocHJvamVjdGlvbi5odG1sKS4gRm9yIGEgZnVsbCBsaXN0IG9mIHByb2plY3Rpb24gY29uZmlndXJhdGlvbiBvcHRpb25zLCBwbGVhc2Ugc2VlIHRoZSBbY29ycmVzcG9uZGluZyBzZWN0aW9uIG9mIHRoZSBwcm9qZWN0aW9uIGRvY3VtZW50YXRpb25dKHByb2plY3Rpb24uaHRtbCNjb25maWcpLlxuICAgKi9cbiAgcHJvamVjdGlvbj86IFByb2plY3Rpb25Db25maWc7XG5cbiAgLyoqIEFuIG9iamVjdCBoYXNoIHRoYXQgZGVmaW5lcyBrZXktdmFsdWUgbWFwcGluZ3MgdG8gZGV0ZXJtaW5lIGRlZmF1bHQgcHJvcGVydGllcyBmb3IgbWFya3Mgd2l0aCBhIGdpdmVuIFtzdHlsZV0obWFyay5odG1sI21hcmstZGVmKS4gIFRoZSBrZXlzIHJlcHJlc2VudCBzdHlsZXMgbmFtZXM7IHRoZSB2YWx1ZXMgaGF2ZSB0byBiZSB2YWxpZCBbbWFyayBjb25maWd1cmF0aW9uIG9iamVjdHNdKG1hcmsuaHRtbCNjb25maWcpLiAgKi9cbiAgc3R5bGU/OiBTdHlsZUNvbmZpZ0luZGV4O1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbmZpZzogQ29uZmlnID0ge1xuICBwYWRkaW5nOiA1LFxuICB0aW1lRm9ybWF0OiAnJyxcbiAgY291bnRUaXRsZTogJ051bWJlciBvZiBSZWNvcmRzJyxcblxuICBpbnZhbGlkVmFsdWVzOiAnZmlsdGVyJyxcblxuICB2aWV3OiBkZWZhdWx0Vmlld0NvbmZpZyxcblxuICBtYXJrOiBtYXJrLmRlZmF1bHRNYXJrQ29uZmlnLFxuICBhcmVhOiB7fSxcbiAgYmFyOiBtYXJrLmRlZmF1bHRCYXJDb25maWcsXG4gIGNpcmNsZToge30sXG4gIGdlb3NoYXBlOiB7fSxcbiAgbGluZToge30sXG4gIHBvaW50OiB7fSxcbiAgcmVjdDoge30sXG4gIHJ1bGU6IHtjb2xvcjogJ2JsYWNrJ30sIC8vIE5lZWQgdGhpcyB0byBvdmVycmlkZSBkZWZhdWx0IGNvbG9yIGluIG1hcmsgY29uZmlnXG4gIHNxdWFyZToge30sXG4gIHRleHQ6IHtjb2xvcjogJ2JsYWNrJ30sIC8vIE5lZWQgdGhpcyB0byBvdmVycmlkZSBkZWZhdWx0IGNvbG9yIGluIG1hcmsgY29uZmlnXG4gIHRpY2s6IG1hcmsuZGVmYXVsdFRpY2tDb25maWcsXG4gIHRyYWlsOiB7fSxcblxuICBib3g6IHtzaXplOiAxNCwgZXh0ZW50OiAxLjV9LFxuICBib3hXaGlza2VyOiB7fSxcbiAgYm94TWlkOiB7Y29sb3I6ICd3aGl0ZSd9LFxuXG4gIHNjYWxlOiBkZWZhdWx0U2NhbGVDb25maWcsXG4gIHByb2plY3Rpb246IHt9LFxuICBheGlzOiB7fSxcbiAgYXhpc1g6IHt9LFxuICBheGlzWToge21pbkV4dGVudDogMzB9LFxuICBheGlzTGVmdDoge30sXG4gIGF4aXNSaWdodDoge30sXG4gIGF4aXNUb3A6IHt9LFxuICBheGlzQm90dG9tOiB7fSxcbiAgYXhpc0JhbmQ6IHt9LFxuICBsZWdlbmQ6IGRlZmF1bHRMZWdlbmRDb25maWcsXG5cbiAgc2VsZWN0aW9uOiBkZWZhdWx0U2VsZWN0aW9uQ29uZmlnLFxuICBzdHlsZToge30sXG5cbiAgdGl0bGU6IHt9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDb25maWcoY29uZmlnOiBDb25maWcpIHtcbiAgcmV0dXJuIG1lcmdlRGVlcChkdXBsaWNhdGUoZGVmYXVsdENvbmZpZyksIGNvbmZpZyk7XG59XG5cbmNvbnN0IE1BUktfU1RZTEVTID0gWyd2aWV3J10uY29uY2F0KFBSSU1JVElWRV9NQVJLUywgQ09NUE9TSVRFX01BUktfU1RZTEVTKSBhcyAoJ3ZpZXcnIHwgTWFyayB8IENvbXBvc2l0ZU1hcmtTdHlsZSlbXTtcblxuXG5jb25zdCBWTF9PTkxZX0NPTkZJR19QUk9QRVJUSUVTOiAoa2V5b2YgQ29uZmlnKVtdID0gW1xuICAncGFkZGluZycsICdudW1iZXJGb3JtYXQnLCAndGltZUZvcm1hdCcsICdjb3VudFRpdGxlJyxcbiAgJ3N0YWNrJywgJ3NjYWxlJywgJ3NlbGVjdGlvbicsICdpbnZhbGlkVmFsdWVzJyxcbiAgJ292ZXJsYXknIGFzIGtleW9mIENvbmZpZyAvLyBGSVhNRTogUmVkZXNpZ24gYW5kIHVuaGlkZSB0aGlzXG5dO1xuXG5jb25zdCBWTF9PTkxZX0FMTF9NQVJLX1NQRUNJRklDX0NPTkZJR19QUk9QRVJUWV9JTkRFWCA9IHtcbiAgdmlldzogWyd3aWR0aCcsICdoZWlnaHQnXSxcbiAgLi4uVkxfT05MWV9NQVJLX1NQRUNJRklDX0NPTkZJR19QUk9QRVJUWV9JTkRFWCxcbiAgLi4uVkxfT05MWV9DT01QT1NJVEVfTUFSS19TUEVDSUZJQ19DT05GSUdfUFJPUEVSVFlfSU5ERVhcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcEFuZFJlZGlyZWN0Q29uZmlnKGNvbmZpZzogQ29uZmlnKSB7XG4gIGNvbmZpZyA9IGR1cGxpY2F0ZShjb25maWcpO1xuXG4gIGZvciAoY29uc3QgcHJvcCBvZiBWTF9PTkxZX0NPTkZJR19QUk9QRVJUSUVTKSB7XG4gICAgZGVsZXRlIGNvbmZpZ1twcm9wXTtcbiAgfVxuXG4gIC8vIFJlbW92ZSBWZWdhLUxpdGUgb25seSBheGlzL2xlZ2VuZCBjb25maWdcbiAgaWYgKGNvbmZpZy5heGlzKSB7XG4gICAgZm9yIChjb25zdCBwcm9wIG9mIFZMX09OTFlfR1VJREVfQ09ORklHKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmF4aXNbcHJvcF07XG4gICAgfVxuICB9XG4gIGlmIChjb25maWcubGVnZW5kKSB7XG4gICAgZm9yIChjb25zdCBwcm9wIG9mIFZMX09OTFlfR1VJREVfQ09ORklHKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmxlZ2VuZFtwcm9wXTtcbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmUgVmVnYS1MaXRlIG9ubHkgZ2VuZXJpYyBtYXJrIGNvbmZpZ1xuICBpZiAoY29uZmlnLm1hcmspIHtcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgVkxfT05MWV9NQVJLX0NPTkZJR19QUk9QRVJUSUVTKSB7XG4gICAgICBkZWxldGUgY29uZmlnLm1hcmtbcHJvcF07XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBtYXJrVHlwZSBvZiBNQVJLX1NUWUxFUykge1xuICAgIC8vIFJlbW92ZSBWZWdhLUxpdGUtb25seSBtYXJrIGNvbmZpZ1xuICAgIGZvciAoY29uc3QgcHJvcCBvZiBWTF9PTkxZX01BUktfQ09ORklHX1BST1BFUlRJRVMpIHtcbiAgICAgIGRlbGV0ZSBjb25maWdbbWFya1R5cGVdW3Byb3BdO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBWZWdhLUxpdGUgb25seSBtYXJrLXNwZWNpZmljIGNvbmZpZ1xuICAgIGNvbnN0IHZsT25seU1hcmtTcGVjaWZpY0NvbmZpZ3MgPSBWTF9PTkxZX0FMTF9NQVJLX1NQRUNJRklDX0NPTkZJR19QUk9QRVJUWV9JTkRFWFttYXJrVHlwZV07XG4gICAgaWYgKHZsT25seU1hcmtTcGVjaWZpY0NvbmZpZ3MpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvcCBvZiB2bE9ubHlNYXJrU3BlY2lmaWNDb25maWdzKSB7XG4gICAgICAgIGRlbGV0ZSBjb25maWdbbWFya1R5cGVdW3Byb3BdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlZGlyZWN0IG1hcmsgY29uZmlnIHRvIGNvbmZpZy5zdHlsZSBzbyB0aGF0IG1hcmsgY29uZmlnIG9ubHkgYWZmZWN0IGl0cyBvd24gbWFyayB0eXBlXG4gICAgLy8gd2l0aG91dCBhZmZlY3Rpbmcgb3RoZXIgbWFya3MgdGhhdCBzaGFyZSB0aGUgc2FtZSB1bmRlcmx5aW5nIFZlZ2EgbWFya3MuXG4gICAgLy8gRm9yIGV4YW1wbGUsIGNvbmZpZy5yZWN0IHNob3VsZCBub3QgYWZmZWN0IGJhciBtYXJrcy5cbiAgICByZWRpcmVjdENvbmZpZyhjb25maWcsIG1hcmtUeXBlKTtcbiAgfVxuXG4gIC8vIFJlZGlyZWN0IGNvbmZpZy50aXRsZSAtLSBzbyB0aGF0IHRpdGxlIGNvbmZpZyBkbyBub3RcbiAgLy8gYWZmZWN0IGhlYWRlciBsYWJlbHMsIHdoaWNoIGFsc28gdXNlcyBgdGl0bGVgIGRpcmVjdGl2ZSB0byBpbXBsZW1lbnQuXG4gIHJlZGlyZWN0Q29uZmlnKGNvbmZpZywgJ3RpdGxlJywgJ2dyb3VwLXRpdGxlJyk7XG5cbiAgLy8gUmVtb3ZlIGVtcHR5IGNvbmZpZyBvYmplY3RzXG4gIGZvciAoY29uc3QgcHJvcCBpbiBjb25maWcpIHtcbiAgICBpZiAoaXNPYmplY3QoY29uZmlnW3Byb3BdKSAmJiBrZXlzKGNvbmZpZ1twcm9wXSkubGVuZ3RoID09PSAwKSB7XG4gICAgICBkZWxldGUgY29uZmlnW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBrZXlzKGNvbmZpZykubGVuZ3RoID4gMCA/IGNvbmZpZyA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcmVkaXJlY3RDb25maWcoY29uZmlnOiBDb25maWcsIHByb3A6IE1hcmsgfCBDb21wb3NpdGVNYXJrU3R5bGUgfCAndGl0bGUnIHwgJ3ZpZXcnLCB0b1Byb3A/OiBzdHJpbmcpIHtcbiAgY29uc3QgcHJvcENvbmZpZzogVmdNYXJrQ29uZmlnID0gcHJvcCA9PT0gJ3RpdGxlJyA/IGV4dHJhY3RUaXRsZUNvbmZpZyhjb25maWcudGl0bGUpLm1hcmsgOiBjb25maWdbcHJvcF07XG5cbiAgaWYgKHByb3AgPT09ICd2aWV3Jykge1xuICAgIHRvUHJvcCA9ICdjZWxsJzsgLy8gVmlldydzIGRlZmF1bHQgc3R5bGUgaXMgXCJjZWxsXCJcbiAgfVxuXG4gIGNvbnN0IHN0eWxlOiBWZ01hcmtDb25maWcgPSB7XG4gICAgLi4ucHJvcENvbmZpZyxcbiAgICAuLi5jb25maWcuc3R5bGVbcHJvcF1cbiAgfTtcbiAgLy8gc2V0IGNvbmZpZy5zdHlsZSBpZiBpdCBpcyBub3QgYW4gZW1wdHkgb2JqZWN0XG4gIGlmIChrZXlzKHN0eWxlKS5sZW5ndGggPiAwKSB7XG4gICAgY29uZmlnLnN0eWxlW3RvUHJvcCB8fCBwcm9wXSA9IHN0eWxlO1xuICB9XG4gIGRlbGV0ZSBjb25maWdbcHJvcF07XG59XG4iXX0=