using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase
    {
        [HttpPost]
        public IActionResult PostIncomes([FromBody] List<Income> incomes)
        {

            Console.WriteLine("Valami érkezett");


            if (incomes == null || !incomes.Any())
                return BadRequest("Nincs adat!");


            var structuredIncomes = incomes
    .GroupBy(income => new { income.Year, income.Month }).Select(x => new
    {
        Year = x.Key.Year,
        Month = x.Key.Month,
        TotalAmount = x.Sum(x => x.Amount) 
    }).OrderBy(x => x.Year).ThenBy(x => x.Month)
    .ToList();

            Console.WriteLine("Írj ki valamit!");

            // Példa: adatbázisba mentés itt jönne
            
            return Ok(structuredIncomes);
        }
    }
}
