# [ brainstorming notes ]

## list of POC(s)

1. ✅ test basic tailwindcss and echarts and vue integration
2. ✅ add in dynamic layout.json loading (/public/layouts/default.json)
3. ✅ based on layout.json, dynamically render the dashboard components 1 by 1 (now is hard-coded)
-. ❌ introduce renderer concept...
-. ❌ add in attributes merge for component(s)
-. ❌ enhance the dashboard container widget (reference kibana, per widget has a common set of buttons like `_ ☐ ✗` buttons on top right)
-. ❌ enhance the dashboard layout syntax; having rows and cols concept (width or smart-width like flex containers; final idea 12-col grid design instead)

## (done) suggested layout
```bash
src/
├── components/
│   ├── dashboard/
│   │   ├── Dashboard.vue
│   │   ├── DashboardRenderer.vue
│   │   ├── LayoutRenderer.vue
│   │   └── WidgetRenderer.vue
│   │
│   ├── layouts/
│   │   ├── GridLayout.vue
│   │   └── FreeformLayout.vue
│   │
│   └── widgets/
│       ├── BarChart.vue
│       ├── LineChart.vue
│       ├── Table.vue
│       └── KPI.vue
│
├── registry/
│   ├── widgets.ts
│   └── layouts.ts
│
├── resolver/
│   ├── widget.ts
│   ├── layout.ts
│   └── attributes.ts
│
├── models/
│   └── dashboard.ts
│
└── data/
    └── default.json
```

## ultimate form of a sample barchart component:

```vue
<BoardBarChart
  :data="chartData"
  :attributes="attributes"
/>
```

where charData:
```javascript
const chartData = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [...]
}
```

and attributes:
```yaml
type: barchart

attributes:
  height: 320
  legend: true
  showTitle: true
  borderRadius: 4
  fontSize: 12
```

(done) component registry:
```json5
{
  type: 'barchart',
  component: BoardBarChart,
  attributes: ...
```
}

-=-=-=-=-=-

