<div align="center">

## <span style="color:#FF4124"> **Ai Energy Disclosure Standard** </span> ( <span style="color:#FAAFA5"><small> **AiEDs v2.2.0** </small></span> )

### 🌎 <span style="color:#EDC303"> Total **AiEDs** Usage | standard </span> 🏰

<table>
<tr>
<td align="center" width="25%">

⚡<br>
<b>12.6</b><br>
<sub>kWh</sub>

</td>
<td align="center" width="25%">

🌫️<br>
<b>5.4</b><br>
<sub>kg CO₂e</sub>

</td>
<td align="center" width="25%">

🌳<br>
<sub>Tree-Time</sub><br>
<b>94</b><br>
<sub>days</sub>

</td>
<td align="center" width="25%">

🔢<br>
<b>71.84 M</b><br>
<sub>tokens, 13 sessions</sub>

</td>
</tr>
</table>

<sub>Tree-Time is the time one mature tree (two or more years of growth) needs to capture this carbon at its yearly rate, 21 kg CO₂e per year; shown in days.</sub>

**The figures above are the AiEDs impact of developing this repository,**
measured by a `SessionEnd` hook on the developers' machines and reported under AiEDs section 2.4.1,<br>
which counts plain input, cache-creation and cache-read tokens all as input at the input coefficient.<br>
<sub>97.5 percent of our input is cache reads, so that rule decides the answer by 7.6x.
Weighting a cache read at 0.1 instead gives <b>1.7 kWh, 0.7 kg CO₂e, 12 days of Tree-Time</b>.
That lower figure is <b>a local departure from the standard, not a reading of it</b>. It is
published because it is what this project offsets against.
</sub>

<details>
<summary><b>Equivalencies</b></summary>

<sub>The same educational comparisons the rand0m.ai app renders, from the same constants. Educational comparisons, not measurements.</sub>

| Equivalent | Amount | Basis |
| --- | ---: | --- |
| Phone charges | 1,051 | 12 Wh per charge |
| LED bulb hours | 1,261 | 10 W bulb |
| Laptop hours | 252 | 50 W laptop |
| Driving distance | 32 km | 170 g CO₂e per km |
| Tree-Time | 94 days | 21 kg CO₂e per mature tree per year |

</details>

<details>
<summary><b>Offset</b></summary>

<sub>What the figures above cost, and what it would take to absorb them. Modeled, like everything else here.</sub>

**Energy cost: USD 2.31.** 12.6 kWh at USD 0.1834 per kWh, the United States average residential price for June 2026 (18.34 cents per kilowatthour), from <a href="https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_3">U.S. Energy Information Administration, Electric Power Monthly, Table 5.3</a>. The rate is pinned, not looked up at render time, so this figure is reproducible.

**Modeled provider spend: USD 30.05.** The same sessions priced at published API list prices, rates version 2026-09-01, with cache writes at 1.25x and cache reads at 0.1x an input token. It is a MODEL, not a bill: this work runs on a subscription, so the marginal cost was nothing. It covers the 8 of 13 sessions counted above whose model that file prices; the other 5 carry a model nobody has priced and add nothing, rather than an assumed rate.

**Trees needed: 1.** 5.4 kg CO₂e divided by 21 kg CO₂e, the yearly capture of one mature tree, rounded up: 1 mature tree would absorb this carbon within one year. Put the other way round, that is the Tree-Time above: one mature tree working for 94 days.

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

<sub>Measured by a <code>SessionEnd</code> hook on one developer machine; a second machine's ledger is not yet merged in, over 293 recorded sessions covering 2026-07-27 to 2026-09-13, which is every session the hook recorded and no session it did not. Two attribution bases are published: BY LANE LEDGER in the table above, and BY WORKING DIRECTORY, the stricter view, in <code>aieds-readme.json</code>. The organisation totals are the same under both. Generated, never hand-typed.</sub>

</div>
