<div align="center">

## <span style="color:#FF4124"> **Ai Energy Disclosure Standard** </span> ( <span style="color:#FAAFA5"><small> **AiEDs v2.2.0** </small></span> )

### 🌎 <span style="color:#EDC303"> Total **AiEDs** Usage | micr0pad </span> 🏰

<table>
<tr>
<td align="center" width="25%">

⚡<br>
<b>96.0</b><br>
<sub>kWh</sub>

</td>
<td align="center" width="25%">

🌫️<br>
<b>41.2</b><br>
<sub>kg CO₂e</sub>

</td>
<td align="center" width="25%">

🌳<br>
<b>716</b><br>
<sub>tree-days</sub>

</td>
<td align="center" width="25%">

🔢<br>
<b>549 M</b><br>
<sub>tokens, 5 sessions</sub>

</td>
</tr>
</table>

**The figures above are the AiEDs impact of developing this repository,**
measured by a `SessionEnd` hook on the developers' machines and reported under AiEDs section 2.4.1,<br>
which counts plain input, cache-creation and cache-read tokens all as input at the input coefficient.<br>
<sub>96.0 percent of our input is cache reads, so that rule decides the answer by 7.0x.
Weighting a cache read at 0.1 instead gives <b>13.7 kWh, 5.9 kg CO₂e, 102 tree-days</b>.
That lower figure is <b>a local departure from the standard, not a reading of it</b>. It is
published because it is what this project offsets against.
</sub>

<details>
<summary><b>Equivalencies</b></summary>

<sub>The same educational comparisons the rand0m.ai app renders, from the same constants: a phone charge is 12 Wh, an LED bulb 10 W, a laptop 50 W, and driving 170 gCO₂e per km. Educational comparisons, not measurements.</sub>

| Equivalent | 96.0 kWh and 41.2 kg CO₂e is about |
| --- | --- |
| Phone charges | 8,004 |
| LED bulb hours | 9,605 |
| Laptop hours | 1,921 |
| Driving | 242 km |
| Tree-Time | 716 tree-days |

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
