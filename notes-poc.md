# [ brainstorming notes ]

## list of POC(s)

1. ✅ test basic tailwindcss and echarts and vue integration
-. ❌ add in dynamic layout.json feature to dynamically render the dashboard components 1 by 1 (now is hard-coded)
-. ❌ add in attributes merge for component(s)
-. ❌ enhance the dashboard container widget (reference kibana, per widget has a common set of buttons like `_ ☐ ✗` buttons on top right)
-. ❌ enhance the dashboard layout syntax; having rows and cols concept (width or smart-width like flex containers)

## (done) suggested layout
```bash
boardkit/
│
├── src/
│   │
│   ├── components/
│   │   └── board/
│   │       ├── BoardButton.vue
│   │       ├── BoardCombo.vue
│   │       └── BoardBarChart.vue
│   │
│   ├── registry/
│   │   ├── component-registry.ts
│   │   └── types.ts
│   │
│   ├── themes/
│   │   ├── default.css
│   │   └── dark.css
│   │
│   ├── stores/
│   │   └── theme.ts
│   │
│   ├── router/
│   │   └── index.ts
│   │
│   ├── views/
│   │   ├── Dashboard.vue
│   │   ├── Components.vue
│   │   └── Themes.vue
│   │
│   ├── App.vue
│   ├── main.ts
│   └── style.css
│
├── vite.config.ts
├── package.json
└── ...
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

