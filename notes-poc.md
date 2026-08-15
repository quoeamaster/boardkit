# [ brainstorming notes ]

## suggested layout
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

component registry:
```json5
{
  type: 'barchart',
  component: BoardBarChart,
  attributes: ...
}
```