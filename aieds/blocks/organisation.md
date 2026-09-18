<div align="center">

## <span style="color:#FF4124"> **Ai Energy Disclosure Standard** </span> ( <span style="color:#FAAFA5"><small> **AiEDs v2.2.0** </small></span> )

### 🌎 <span style="color:#EDC303"> Total **AiEDs** Usage | Random Knights, LLC </span> 🏰

<table>
<tr>
<td align="center" width="25%">

⚡<br>
<b>3,252.7</b><br>
<sub>kWh</sub>

</td>
<td align="center" width="25%">

🌫️<br>
<b>1,395.4</b><br>
<sub>kg CO₂e</sub>

</td>
<td align="center" width="25%">

🌳<br>
<sub>Tree-Time</sub><br>
<b>24,254</b><br>
<sub>days</sub>

</td>
<td align="center" width="25%">

🔢<br>
<b>18.82 B</b><br>
<sub>tokens, 293 sessions</sub>

</td>
</tr>
</table>

<sub>Tree-Time is the time one mature tree (two or more years of growth) needs to capture this carbon at its yearly rate, 21 kg CO₂e per year; shown in days.</sub>

**The figures above are the AiEDs impact of developing every repository in this organization,**
measured by a `SessionEnd` hook on the developers' machines and reported under AiEDs section 2.4.1,<br>
which counts plain input, cache-creation and cache-read tokens all as input at the input coefficient.<br>
<sub>98.3 percent of our input is cache reads, so that rule decides the answer by 1.8x.
Weighting a cache read at 0.1 instead gives <b>1,760.3 kWh, 755.2 kg CO₂e, 13,125 days of Tree-Time</b>.
That lower figure is <b>a local departure from the standard, not a reading of it</b>. It is
published because it is what this project offsets against.
Only 51.6 percent of the input tokens were recorded with a cache breakdown;
the rest predate that field and are weighted 1.0, so the departure figure is conservative.
</sub>

<details>
<summary><b>By repository</b></summary>

<sub>Attributed by the LANE LEDGER: a session that ran inside a repository is placed there, and a session that ran in the workspace root or a scratchpad is spread across the repositories its lane events name inside that session's window, one share per event. 70 of 293 recorded sessions were spread this way; 58 of them predate the recorded session duration and use a six-hour look-back, which is an assumption and is stated here rather than hidden. 160 sessions could be placed on no repository at all and are in the organization total above only, so these rows do not add up to it. The strict by-directory figures are published beside this block in <code>aieds-readme.json</code>.</sub>

| Repository | kWh | kg CO₂e | Tree-Time (days) | tokens | sessions |
| --- | ---: | ---: | ---: | ---: | ---: |
| ruok | 1,013.9 | 435.0 | 7,560 | 5.80 B | 114 |
| micr0pad | 113.7 | 48.8 | 848 | 650 M | 11 |
| xyz | 61.4 | 26.3 | 458 | 351 M | 24 |
| org | 51.2 | 22.0 | 382 | 293 M | 25 |
| rk_branding | 22.0 | 9.4 | 164 | 126 M | 16 |
| xyz-docs | 20.2 | 8.7 | 151 | 116 M | 17 |
| llc | 18.7 | 8.0 | 139 | 107 M | 17 |
| xyz-tools | 15.6 | 6.7 | 116 | 89.34 M | 8 |
| standard | 12.6 | 5.4 | 94 | 71.84 M | 13 |
| knightly | 11.6 | 5.0 | 87 | 66.66 M | 18 |
| r1-01 | 9.4 | 4.0 | 70 | 53.77 M | 9 |
| randomly | 8.2 | 3.5 | 61 | 46.66 M | 18 |
| rk_agents | 7.5 | 3.2 | 56 | 42.82 M | 10 |
| rk_ui | 6.4 | 2.7 | 48 | 36.62 M | 7 |
| abc | 5.8 | 2.5 | 43 | 33.10 M | 8 |
| xyz-earth | 5.6 | 2.4 | 42 | 31.87 M | 6 |
| 123 | 4.6 | 2.0 | 34 | 26.32 M | 6 |
| .github | 1.9 | 0.8 | 14 | 10.74 M | 6 |
| rk_ai | 1.9 | 0.8 | 14 | 10.74 M | 6 |
| rk_core | 0.9 | 0.4 | 7 | 5.37 M | 6 |
| rk_data | 0.9 | 0.4 | 7 | 5.37 M | 6 |
| rk_media | 0.9 | 0.4 | 7 | 5.37 M | 6 |
| xyz-outreach | 0.9 | 0.4 | 7 | 5.37 M | 6 |

</details>

<details>
<summary><b>Equivalencies</b></summary>

<sub>The same educational comparisons the rand0m.ai app renders, from the same constants. Educational comparisons, not measurements.</sub>

| Equivalent | Amount | Basis |
| --- | ---: | --- |
| Phone charges | 271,062 | 12 Wh per charge |
| LED bulb hours | 325,274 | 10 W bulb |
| Laptop hours | 65,055 | 50 W laptop |
| Driving distance | 8,208 km | 170 g CO₂e per km |
| Tree-Time | 24,254 days | 21 kg CO₂e per mature tree per year |

</details>

<details>
<summary><b>Offset</b></summary>

<sub>What the figures above cost, and what it would take to absorb them. Modeled, like everything else here.</sub>

**Energy cost: USD 596.55.** 3,252.7 kWh at USD 0.1834 per kWh, the United States average residential price for June 2026 (18.34 cents per kilowatthour), from <a href="https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_3">U.S. Energy Information Administration, Electric Power Monthly, Table 5.3</a>. The rate is pinned, not looked up at render time, so this figure is reproducible.

**Modeled provider spend: USD 5,675.50.** The same sessions priced at published API list prices, rates version 2026-09-01, with cache writes at 1.25x and cache reads at 0.1x an input token. It is a MODEL, not a bill: this work runs on a subscription, so the marginal cost was nothing. It covers the 139 of 293 sessions counted above whose model that file prices; the other 154 carry a model nobody has priced and add nothing, rather than an assumed rate.

**Trees needed: 67.** 1,395.4 kg CO₂e divided by 21 kg CO₂e, the yearly capture of one mature tree, rounded up: 67 mature trees would absorb this carbon within one year. Put the other way round, that is the Tree-Time above: one mature tree working for 24,254 days, about 66.4 years.

**Offset cost: USD 8.41.** 1.4 tonnes of CO₂e at USD 6.03 per tonne, the REDD+ (Reduced Emissions from Deforestation and Degradation in Developing Countries) average, 2024, <a href="https://www.ecosystemmarketplace.com/publications/2025-state-of-the-voluntary-carbon-market-sovcm/">Ecosystem Marketplace, State of the Voluntary Carbon Market 2025, Table 4</a>. That is a nature-based avoidance and protection, not removals average: this project prices itself against keeping land, animals and trees standing, never against carbon removals or industrial and household offsets. Buying an offset is not the same as not spending the energy, and this line does not claim otherwise.

</details>

<sub>
<a href="https://standard.rand0m.ai/aieds/v2/methodology.md">AiEDs Methodology v2.2.0</a>
by <a href="https://standard.rand0m.ai">Random Knights, LLC</a> (ORCID 0009-0006-5066-1693),
<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
· `claude` coefficients are <code>class-estimated</code>, the second-weakest provenance tier
· grid 429 gCO₂e/kWh pinned
· measured by a `SessionEnd` hook, not modeled from a guess<br>
Energy and carbon are modeled estimates. Tree-Time and equivalents are educational comparisons.
</sub>

<sub>Measured by a <code>SessionEnd</code> hook on one developer machine; a second machine's ledger is not yet merged in, over 293 recorded sessions covering 2026-07-27 to 2026-09-13, which is every session the hook recorded and no session it did not. Two attribution bases are published: BY LANE LEDGER in the table above, and BY WORKING DIRECTORY, the stricter view, in <code>aieds-readme.json</code>. The organization totals are the same under both. Both bases are DATE AWARE: the application repository was named <code>xyz</code> until 2026-08-19 and is named <code>ruok</code> now, so a row written before that day is placed on the repository the name meant then. Any offset figure is a nature-based average, not removals. Generated, never hand-typed.</sub>

</div>
