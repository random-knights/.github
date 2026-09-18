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
<b>24,254</b><br>
<sub>tree-days</sub>

</td>
<td align="center" width="25%">

🔢<br>
<b>18.82 B</b><br>
<sub>tokens, 293 sessions</sub>

</td>
</tr>
</table>

**The figures above are the AiEDs impact of developing every repository in this organisation,**
measured by a `SessionEnd` hook on the developers' machines and reported under AiEDs section 2.4.1,<br>
which counts plain input, cache-creation and cache-read tokens all as input at the input coefficient.<br>
<sub>98.3 percent of our input is cache reads, so that rule decides the answer by 1.8x.
Weighting a cache read at 0.1 instead gives <b>1,760.3 kWh, 755.2 kg CO₂e, 13,125 tree-days</b>.
That lower figure is <b>a local departure from the standard, not a reading of it</b>. It is
published because it is what this project offsets against.
Only 51.6 percent of the input tokens were recorded with a cache breakdown;
the rest predate that field and are weighted 1.0, so the departure figure is conservative.
</sub>

<details>
<summary><b>By repository</b></summary>

<sub>Attributed by the working directory each session ran in. Sessions that ran in the workspace root, in a scratchpad, or before the hook recorded a working directory are in the organisation total above and on no repository below, so these rows do not add up to it.</sub>

| Repository | kWh | kg CO₂e | tree-days | tokens | sessions |
| --- | ---: | ---: | ---: | ---: | ---: |
| xyz | 331.5 | 142.2 | 2,472 | 1.90 B | 38 |
| ruok | 109.9 | 47.1 | 819 | 629 M | 9 |
| micr0pad | 96.0 | 41.2 | 716 | 549 M | 5 |
| org | 13.8 | 5.9 | 103 | 78.65 M | 3 |
| xyz-docs | 9.2 | 3.9 | 68 | 52.55 M | 2 |
| rk_branding | 7.1 | 3.0 | 53 | 40.44 M | 1 |
| standard | 4.5 | 1.9 | 33 | 25.30 M | 2 |
| r1-01 | 3.6 | 1.5 | 27 | 20.44 M | 1 |

</details>

<details>
<summary><b>Equivalencies</b></summary>

<sub>The same educational comparisons the rand0m.ai app renders, from the same constants: a phone charge is 12 Wh, an LED bulb 10 W, a laptop 50 W, and driving 170 gCO₂e per km. Educational comparisons, not measurements.</sub>

| Equivalent | 3,252.7 kWh and 1,395.4 kg CO₂e is about |
| --- | --- |
| Phone charges | 271,062 |
| LED bulb hours | 325,274 |
| Laptop hours | 65,055 |
| Driving | 8,208 km |
| Tree-Time | 24,254 tree-days |

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

<sub>Measured by a <code>SessionEnd</code> hook on one developer machine; a second machine's ledger is not yet merged in, over 293 recorded sessions. Generated, never hand-typed.</sub>

</div>
