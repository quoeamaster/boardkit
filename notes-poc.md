# [ brainstorming notes ]

## list of POC(s)

01. ✅ test basic tailwindcss and echarts and vue integration
02. ✅ add in dynamic layout.json loading (/public/layouts/default.json)
03. ✅ based on layout.json, dynamically render the dashboard components 1 by 1 (now is hard-coded)
04. ✅ enhance the dashboard layout syntax; having rows and cols concept (width or smart-width like flex containers; final idea 12-col grid design instead)
05. ✅ enhance the dashboard container widget (reference kibana, per widget has a common set of buttons like `_ ☐ ✗` buttons on top right)
06. ✅ config file concept (poc)
07. ✅ parse the yaml (later on sql as well) yaml->parse()
08. ✅ integrate <component> with attributes and queried-data
09. ✅ introduce renderer concept...
10. ✅ add in attributes merge for component(s)
11. ✅ notificationStore and drawer panel showing them

-. ❌ logging notifictions back to QuickBoard Server (important for oTel)
-. ❌ testing on other chart type(s) (e.g. pie)


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

