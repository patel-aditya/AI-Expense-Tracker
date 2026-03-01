

def generate_insights(
        total_budget,
        total_expense,
        category_data,
        current_month_total,
        previous_month_total
):
    insights = []

    # budget usage analysis
    if total_budget > 0:
        usage_percent = (total_expense / total_budget) * 100


        if usage_percent >= 100:
            insights.append("You have exceed your total budget")
        elif usage_percent >= 80:
            insights.append("Warning: You have used more than 80\% of your budget.")
        else:
            insights.append("Your budget usage is under control")


        # month-over-month comparison
        if previous_month_total > 0:
            change = current_month_total = previous_month_total
            percent_change = (change / previous_month_total) * 100

            if percent_change > 0:
                insights.append(f"your spending increase by {percent_change:.2f}% compare to last month")
            elif percent_change < 0:
                insights.append(f"great job! Your spending decreased by {abs(percent_change):.2f}% compared to last month.")
            else:
                insights.append("Your spending remained the same as last month")

    # Highest Category
    if category_data:
        highest = max(category_data, key = lambda x : x["total"])
        insights.append(f"Your highest spending category is {highest['category']}.")

    return insights