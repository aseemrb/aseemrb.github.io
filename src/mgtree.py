import requests
from bs4 import BeautifulSoup
import time
import sys
import json

class GenealogyScraper:
    def __init__(self):
        self.base_url = "https://genealogy.math.ndsu.nodak.edu"
        self.visited = {}  # Cache to handle convergence and avoid cycles
        # Headers are important to behave like a real browser and avoid immediate blocking
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

    def search_researcher(self, name):
        """
        Searches for a researcher by name and asks the user to select the correct one.
        Returns the ID of the selected researcher.
        """
        data = {'searchTerms': name}
        try:
            response = requests.post(f"{self.base_url}/quickSearch.php", data=data, headers=self.headers)
            response.raise_for_status()
        except requests.RequestException as e:
            print(f"Error searching: {e}")
            return None

        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Check if we were redirected to a profile directly
        if "id.php" in response.url:
            print(f"Direct match found.")
            return response.url.split("id=")[1]

        # Otherwise parse the table of results
        rows = soup.select('table tbody tr')
        results = []
        for row in rows:
            cols = row.find_all('td')
            if len(cols) >= 2:
                link = cols[0].find('a')
                if link:
                    r_name = link.text.strip()
                    r_id = link['href'].split('id=')[1]
                    school = cols[1].text.strip()
                    year = cols[2].text.strip() if len(cols) > 2 else "?"
                    results.append({'name': r_name, 'id': r_id, 'school': school, 'year': year})

        if not results:
            print("No results found.")
            return None

        print(f"\nFound {len(results)} matches for '{name}':")
        for i, res in enumerate(results):
            print(f"{i + 1}: {res['name']} ({res['school']}, {res['year']})")

        while True:
            try:
                choice = int(input("\nEnter the number of the correct researcher (0 to cancel): "))
                if choice == 0:
                    return None
                if 1 <= choice <= len(results):
                    return results[choice - 1]['id']
            except ValueError:
                pass
            print("Invalid selection.")

    def get_researcher_info(self, r_id):
        """
        Scrapes a single researcher's page to get their name, school, year, and advisor IDs.
        """
        # Check cache/visited first - BUT we need to distinguish between "fully visited" and "just cached info"
        # The build_tree method handles the recursion logic. Here we just fetch or return cached data.
        if r_id in self.visited:
            return self.visited[r_id]

        url = f"{self.base_url}/id.php?id={r_id}"
        print(f"Fetching data for ID {r_id}...")
        
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            time.sleep(0.5)  # Be polite to the server
        except requests.RequestException as e:
            print(f"Error fetching ID {r_id}: {e}")
            return None

        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract Name
        h2 = soup.find('h2')
        name = h2.text.strip() if h2 else "Unknown"

        # Extract School and Year
        school = "Unknown School"
        year = "????"
        
        # The site structure usually has:
        # <span style="margin-right: 0.5em">Ph.D. <span style="color: #006633; margin-left: 0.5em">School Name</span> Year</span>
        school_span = soup.find('span', style=lambda value: value and '#006633' in value)
        if school_span:
            school = school_span.text.strip()
            # The year is usually in the parent span's text, after the school span
            parent = school_span.parent
            if parent:
                full_text = parent.get_text().strip()
                # Heuristic: The year is usually the last 4 digits
                # Example: "Ph.D. University of Helmstedt 1799"
                # We can try to find the last 4 digits
                import re
                match = re.search(r'\b\d{4}\b', full_text)
                if match:
                    year = match.group(0)

        # Extract Advisors
        advisors = []
        for p in soup.find_all('p'):
            if 'Advisor' in p.text:
                for link in p.find_all('a'):
                    if 'id.php?id=' in link['href']:
                        adv_id = link['href'].split('id=')[1]
                        adv_name = link.text.strip()
                        advisors.append({'name': adv_name, 'id': adv_id})
        
        node = {
            'id': r_id,
            'name': name,
            'school': school,
            'year': year,
            'advisors': advisors,
            'tree': [] 
        }
        
        # Mark as visited
        self.visited[r_id] = node
        return node

    def build_tree(self, r_id, depth=0, max_depth=40):
        """
        Recursively builds the ancestor tree.
        """
        if depth > max_depth:
            print("Max depth reached, stopping branch.")
            return None

        # Check if we have already visited this node
        if r_id in self.visited:
            # We have visited this node before. 
            # To avoid infinite loops and massive JSON size, we return a "Reference Node".
            # This node will have the basic info but NO children (advisors).
            # The visualization can decide how to handle this (e.g. show it as a leaf).
            cached_node = self.visited[r_id]
            print(f"  [Cycle/Shared] Already visited {cached_node['name']} ({r_id}). Linking reference.")
            return {
                'id': cached_node['id'],
                'name': cached_node['name'],
                'school': cached_node['school'],
                'year': cached_node['year'],
                'tree': [], # Empty tree stops recursion here
                '_reference': True # Flag for UI if needed
            }

        current_node = self.get_researcher_info(r_id)
        if not current_node:
            return None

        # Recursively fetch advisors
        for advisor_stub in current_node['advisors']:
            advisor_id = advisor_stub['id']
            
            advisor_full_node = self.build_tree(advisor_id, depth + 1, max_depth)
            
            if advisor_full_node:
                current_node['tree'].append(advisor_full_node)

        return current_node

    def print_tree(self, node, prefix="", is_last=True):
        """
        Pretty prints the tree structure to console.
        """
        if not node:
            return

        display_str = f"{node['name']} ({node['year']})"
        print(prefix + ("└── " if is_last else "├── ") + display_str)
        
        prefix += "    " if is_last else "│   "
        
        child_count = len(node['tree'])
        for i, advisor in enumerate(node['tree']):
            is_last_child = (i == child_count - 1)
            self.print_tree(advisor, prefix, is_last_child)

    def to_d3_format(self, node):
        """
        Converts the internal node structure to a D3.js compatible hierarchical format.
        Renames 'tree' to 'children' and ensures clean JSON structure.
        """
        if not node:
            return None
        
        # Create a clean dictionary for JSON export
        d3_node = {
            "name": node['name'],
            "id": node['id'],
            "school": node['school'],
            "year": node['year'],
            "children": [self.to_d3_format(child) for child in node['tree']]
        }
        
        # Remove empty children keys to keep JSON clean (optional, but D3 handles empty lists fine)
        if not d3_node["children"]:
            del d3_node["children"]
            
        return d3_node

    def to_graph_format(self):
        """
        Converts the visited nodes to a Node-Link (Graph) format.
        Returns a dictionary with 'nodes' and 'links'.
        """
        nodes = []
        links = []
        
        # We use self.visited because it contains all unique nodes encountered
        for r_id, node in self.visited.items():
            # Add node
            nodes.append({
                "id": node['id'],
                "name": node['name'],
                "school": node['school'],
                "year": node['year']
            })
            
            # Add links to advisors
            for advisor in node['advisors']:
                # Only add link if the advisor is also in the graph (visited)
                # This prevents dangling links to nodes that were not fully fetched (e.g. due to max_depth)
                if advisor['id'] in self.visited:
                    # Direction: Child -> Advisor (Target -> Source in genealogy flow, 
                    # but usually visualized as Source (Advisor) -> Target (Student) or vice versa depending on preference.
                    # Here we'll do Child (Source) -> Advisor (Target) to match the "upwards" traversal)
                    links.append({
                        "source": node['id'],
                        "target": advisor['id']
                    })
                
        return {"nodes": nodes, "links": links}

    def save_to_json(self, root_node, filename="mgtree.json"):
        print(f"\nSaving tree to {filename}...")
        data = self.to_d3_format(root_node)
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("Done! You can now upload this file to a Tree Viewer.")

    def save_to_graph_json(self, filename="mggraph.json"):
        print(f"\nSaving graph to {filename}...")
        data = self.to_graph_format()
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("Done! You can now upload this file to a Graph/Network Viewer.")

def main():
    print("--- Mathematics Genealogy Project Tree Builder ---")
    scraper = GenealogyScraper()
    
    # Kimon Fountoulakis, Aukosh Jagannath, Jeffrey Shallit
    search_names_input = input("Enter the names of the researchers (comma separated): ")
    search_names = [name.strip() for name in search_names_input.split(',') if name.strip()]
    
    roots = []
    
    for name in search_names:
        print(f"\n--- Processing: {name} ---")
        start_id = scraper.search_researcher(name)
        if start_id:
            print(f"Building ancestry tree for ID {start_id}...")
            root = scraper.build_tree(start_id)
            if root:
                roots.append(root)
    
    if roots:
        # Create a virtual root to hold all trees
        virtual_root = {
            'id': 'virtual_root',
            'name': 'Aseem Raj Baranwal',
            'school': 'University of Waterloo',
            'year': '2024',
            'tree': roots
        }
        
        print("\n--- Combined Advisor Tree ---")
        scraper.print_tree(virtual_root)
        
        save = input("\nDo you want to save this to JSON for the web viewer? (y/n): ").lower()
        if save == 'y':
            scraper.save_to_json(virtual_root)
            
            save_graph = input("Do you also want to save as a Graph (Node-Link) to eliminate duplicates? (y/n): ").lower()
            if save_graph == 'y':
                scraper.save_to_graph_json()
    else:
        print("\nNo trees could be built.")

if __name__ == "__main__":
    main()